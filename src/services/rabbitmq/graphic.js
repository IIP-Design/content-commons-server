import { publishToChannel, parseMessage } from './util';
import { prisma } from '../../schema/generated/prisma-client';


const updateDatabase = async ( id, data ) => prisma.updateGraphicProject( { data, where: { id } } )
  .catch( err => console.error( err ) );


/**
 * Put publish creation request on publish.create queue
 *
 * @param {string} id project id
 * @param {object} data project data
 * @param {object} status project status
 * @param {object} projectDirectory path to S3 dir
 *
 * NOTE: function name follows [exchange][routing key] convention
 */
export const publishCreate = async ( id, data, status, projectDirectory ) => {
  console.log( '[x] PUBLISHING a publish GRAPHIC create request' );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'create.graphic',
    data: {
      projectId: id,
      projectStatus: status,
      projectJson: JSON.stringify( data ),
      projectDirectory,
    },
  } );
};


/**
 * Put publish deletion request on publish.delete queue
 *
 * @param {string} id project id to delete
 * @param {object} projectDirectory path to S3 dir
 *
 */
export const publishDelete = async ( id, projectDirectory ) => {
  console.log( '[x] PUBLISHING a publish GRAPHIC delete request' );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'delete.graphic',
    data: {
      projectId: id,
      projectDirectory,
    },
  } );
};


export const publishUpdate = async ( id, data, status, projectDirectory ) => {
  console.log( '[x] PUBLISHING a publish GRAPHIC upate request' );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'update.graphic',
    data: {
      projectId: id,
      projectStatus: status,
      projectJson: JSON.stringify( data ),
      projectDirectory,
    },
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
  channel.ack( msg );
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

const consumer = {
  consumeSuccess,
  consumeError,
};

export default consumer;
