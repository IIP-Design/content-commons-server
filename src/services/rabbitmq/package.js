import { publishToChannel, parseMessage } from './index';
import { prisma } from '../../schema/generated/prisma-client';

const updateDatabase = async ( id, data ) => {
  await prisma.updatePackage( { data, where: { id } } ).catch( err => console.error( err ) );
};

/**
 * Put publish creation request on publish.create queue
 *
 * @param {string} id project id
 * @param {object} data project data
 *
 * NOTE: function name follows [exchange][routing key] convention
 */
export const publishCreate = async ( id, data, status, projectDirectory ) => {
  // data.type: 'package'.  Also creates each document contained within package
  console.log( '[x] PUBLISHING a package publish create request' );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'create.package',
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
export const publishDelete = async ( ids, projectDirectory ) => {
  console.log( '[x] PUBLISHING a publish package delete request' );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'delete.package',
    data: {
      projectIds: ids,
      projectDirectory
    }
  } );
};


export const publishUpdate = async ( id, data, status, projectDirectory ) => {
  console.log( '[x] PUBLISHING a publish package upate request' );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'update.package',
    data: {
      projectId: id,
      projectStatus: status,
      projectJson: JSON.stringify( data ),
      projectDirectory
    }
  } );
};


const consumeSuccess = async ( channel, msg ) => {
  // 1. Parse message
  const { routingKey, data: { projectId } } = parseMessage( msg );
  const status = routingKey === 'delete.package' ? 'UNPUBLISH_SUCCESS' : 'PUBLISH_SUCCESS';

  console.log( `[√] RECEIVED a publish ${routingKey} result for project ${projectId}` );

  // 2. Update db with success status to alert the client (client polls for status changes)
  try {
    updateDatabase(
      projectId, { status }
    );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }

  // 3. acknowledge message as received
  await channel.ack( msg );
};

const consumeError = async ( channel, msg ) => {
  // 1. parse message
  const { routingKey, data: { projectIds } } = parseMessage( msg );
  const errorMessage = `Unable to process queue ${routingKey} request for project : ${projectIds.id} `;

  const status = routingKey === 'delete.package' ? 'UNPUBLISH_FAILURE' : 'PUBLISH_FAILURE';

  // 2. Update db with failed status to alert the client (client polls for status changes)
  try {
    updateDatabase( projectIds.id, { status } );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }

  // 3. log error
  console.log( errorMessage );
};

export default {
  consumeSuccess,
  consumeError
};
