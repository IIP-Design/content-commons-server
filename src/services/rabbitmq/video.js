import { publishToChannel, parseMessage } from './index';
import { getS3ProjectDirectory } from '../../lib/projectParser';
import { notifyClientOnSuccess, notifyClientOnError } from './notify';
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


const onPublishCreate = async projectId => {
  try {
    updateDatabase( projectId, {
      status: 'PUBLISHED',
      publishedAt: ( new Date() ).toISOString()
    } );
    // notify the client
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }
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

const onPublishDelete = async projectId => {
  console.log( `onPublishDelete ${projectId}` );
  try {
    updateDatabase( projectId, {
      status: 'DRAFT',
      publishedAt: null
    } );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }
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

const onPublishUpdate = async projectId => {
  try {
    updateDatabase( projectId, {
      status: 'PUBLISHED',
      publishedAt: ( new Date() ).toISOString()
    } );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }
};

export const consumeSuccess = async ( channel, msg ) => {
  // parse message
  const { routingKey, projectId } = parseMessage( msg );
  let status;

  console.log( `[√] RECEIVED a publish ${routingKey} result for project ${projectId}` );

  // 1. on successful result, update db with applicable status using the returned projectId
  switch ( routingKey ) {
    case 'result.create.video':
      onPublishCreate( projectId );
      status = 'PUBLISHED';
      break;

    case 'result.update.video':
      onPublishUpdate( projectId );
      status = 'PUBLISHED';
      break;

    case 'result.delete.video':
      onPublishDelete( projectId );
      status = 'DRAFT';
      break;

    default:
      console.log( `Invalid result type: ${routingKey}` );
      break;
  }

  // 2. notify the react client
  notifyClientOnSuccess( { id: projectId, status } );

  // 3. acknowledge message as received
  await channel.ack( msg );
};

export const consumeError = async ( channel, msg ) => {
  // parse message
  const { routingKey, projectId, projectStatus } = parseMessage( msg );

  const errorMessage = `Unable to process queue ${routingKey} request for project : ${projectId} `;
  console.log( errorMessage );

  try {
    updateDatabase( projectId, { status: projectStatus } );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }

  // 2. notify the react client
  notifyClientOnError( { id: projectId, status: projectStatus, error: errorMessage } );
};
