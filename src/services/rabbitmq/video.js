import { publishToChannel, parseMessage } from './index';
import { getS3ProjectDirectory } from '../../lib/projectParser';
import { prisma } from '../../schema/generated/prisma-client';

import { VIDEO_UNIT_VIDEO_FILES } from '../../fragments/video';


const updateDatabase = async ( id, data ) => {
  await prisma.updateVideoProject( { data, where: { id } } ).catch( err => console.error( err ) );
};

const _getS3ProjectDirectory = async id => {
  const units = await prisma.videoProject( { id } ).units().$fragment( VIDEO_UNIT_VIDEO_FILES );
  return getS3ProjectDirectory( units );
};


/**
 * Put publish creation request on publish.create queue
 *
 * @param {string} id project id
 * @param {object} data project data
 *
 * NOTE: function name follows [exchange][routing key] convention
 */
export const publishCreate = async ( id, data, status ) => {
  // data.type: 'video'
  console.log( '[x] PUBLISHING a publish create request' );

  const projectDirectory = await _getS3ProjectDirectory( id );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'create.video',
    data: {
      projectId: id,
      projectStatus: status,
      projectJson: JSON.stringify( data ),
      projectDirectory
    }
  } );
};


/**
 * Put publish deletion request on publish.delete queue
 *
 * @param {string} id project id
 * @param {object} data project data
 *
 */
export const publishDelete = async id => {
  console.log( '[x] PUBLISHING a publish delete request' );

  // connect to Rabbit MQ and create a channel
  const projectDirectory = await _getS3ProjectDirectory( id );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'delete.video',
    data: {
      projectId: id,
      projectDirectory
    }
  } );
};


export const publishUpdate = async ( id, data, status ) => {
  const projectDirectory = await _getS3ProjectDirectory( id );

  console.log( '[x] PUBLISHING a publish upate request' );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'update.video',
    data: {
      projectId: id,
      projectStatus: status,
      projectJson: JSON.stringify( data ),
      projectDirectory
    }
  } );
};


const consumeSuccess = async ( channel, msg ) => {
  // 1. parse message
  const { routingKey, data: { projectId } } = parseMessage( msg );
  const status = routingKey.includes( '.delete' ) ? 'UNPUBLISH_SUCCESS' : 'PUBLISH_SUCCESS';

  console.log( `[√] RECEIVED a publish ${routingKey} result for project ${projectId}` );

  // 2. on successful result, update db with applicable status using the returned projectId
  try {
    updateDatabase( projectId, { status } );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }


  // 3. acknowledge message as received
  await channel.ack( msg );
};

const consumeError = async ( channel, msg ) => {
  // 1. parse message
  const { routingKey, data: { projectId, projectStatus } } = parseMessage( msg );

  // 2. Update db with failed status to alert the client (client polls for status changes)
  try {
    updateDatabase( projectId, { status: projectStatus } );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }

  // 3. log error
  const errorMessage = `Unable to process queue ${routingKey} request for project : ${projectId} `;
  console.log( errorMessage );
};

export default {
  consumeSuccess,
  consumeError
};
