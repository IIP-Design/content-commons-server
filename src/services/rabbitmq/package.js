import { prisma } from '../../schema/generated/prisma-client';
import { getLongestElement, publishToChannel, parseMessage } from './util';

const updateDatabase = async ( id, data ) => {
  await prisma.updatePackage( { data, where: { id } } ).catch( err => console.error( err ) );
};

/**
 * Put publish creation request on publish.create queue
 *
 * @param {string} id project id
 * @param {object} data project data
 * @param {object} status project stastus
 * @param {object} projectDirectory path to S3 dir
 *
 * NOTE: function name follows [exchange][routing key] convention
 */
export const publishCreate = async ( id, data, status, projectDirectory ) => {
  // data.type: 'package'.  Also creates each document contained within package
  console.log( '[x] PUBLISHING a package publish create request' );

  publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'create.package',
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
 * @param {string} ids ids of packages to delete
 * @param {object} projectDirectory path to S3 dir
 *
 */
export const publishDelete = async ( ids, projectDirectory ) => {
  console.log( '[x] PUBLISHING a publish package delete request' );

  publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'delete.package',
    data: {
      projectIds: ids,
      projectDirectory,
    },
  } );
};


export const publishUpdate = async ( id, data, status, projectDirectory ) => {
  console.log( '[x] PUBLISHING a publish package upate request' );

  publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'update.package',
    data: {
      projectId: id,
      projectStatus: status,
      projectJson: JSON.stringify( data ),
      projectDirectory,
    },
  } );
};


const consumePublishSuccess = async ( channel, msg ) => {
  // 1. Parse message
  const { routingKey, data: { projectId } } = parseMessage( msg );
  const status = routingKey.includes( '.delete' ) ? 'UNPUBLISH_SUCCESS' : 'PUBLISH_SUCCESS';

  console.log( `[√] RECEIVED a publish ${routingKey} result for project ${projectId}` );

  // 2. Update db with success status to alert the client (client polls for status changes)
  try {
    updateDatabase(
      projectId, { status },
    );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }

  // 3. acknowledge message as received
  channel.ack( msg );
};

const consumeConvertSuccess = async ( channel, msg ) => {
  // 1. Parse message
  const {
    routingKey, data: {
      id, content, title, thumbnailUrl, error,
    },
  } = parseMessage( msg );

  console.log( `[√] RECEIVED a publish ${routingKey} result for document ${title}` );
  console.log( `thumbnail url is ${thumbnailUrl}` );

  if ( error ) {
    console.log( `Unable to convert document ${title} due to error: ${error}` );
  }

  // 2. Update db with success status to alert the client (client polls for status changes)
  try {
    await prisma.updateDocumentFile( {
      where: { id },
      data: {
        content: {
          create: {
            html: content && content.html ? content.html : 'UNAVAILABLE',
            rawText: content && content.rawText ? content.rawText : 'UNAVAILABLE',
          },
        },
        excerpt: content && content.html ? getLongestElement( content.html ) : 'UNAVAILABLE',
        image: {
          create: {
            url: thumbnailUrl || 'UNAVAILABLE',
            alt: thumbnailUrl ? `Thumbnail for ${title}` : '',
          },
        },
      },
    } );
  } catch ( err ) {
    console.log( `Error: Cannot update document with converted content becaues: ${err.message}` );
  }

  // 3. acknowledge message as received
  channel.ack( msg );
};


const consumeError = async ( channel, msg ) => {
  // 1. parse message
  const { routingKey, data: { projectIds } } = parseMessage( msg );

  // 2. Update db with failed status to alert the client (client polls for status changes)
  try {
    const status = routingKey.includes( '.delete' ) ? 'UNPUBLISH_FAILURE' : 'PUBLISH_FAILURE';

    updateDatabase( projectIds.id, { status } );
  } catch ( err ) {
    console.log( `[package consumeError]: cannot package status : ${err.message}` );
  }

  // 3. log error
  const id = projectIds && projectIds.id ? `: ${projectIds.id}` : '';
  const errorMessage = `Unable to process queue ${routingKey} request for project ${id} `;

  console.log( errorMessage );
};

const consumer = {
  consumePublishSuccess,
  consumeConvertSuccess,
  consumeError,
};

export default consumer;

