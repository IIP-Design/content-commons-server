import { publishToChannel, parseMessage } from './util';
import { prisma } from '../../schema/generated/prisma-client';


const updateDatabase = async ( id, data ) => prisma.updatePlaybook( { data, where: { id } } )
  .catch( err => console.error( err ) );

/**
 * Sets an initial publish date for a playbook that has never been published
 * @param {string} status publish action completed, either publish or unpublish
 * @param {string} id playbook's id
 * @returns object
 */
const maybeSetInitialPublishDate = async ( status, id ) => {
  if ( status === 'PUBLISH_SUCCESS' ) {
    const res = await prisma.playbook( { id } );

    if ( !res.initialPublishedAt ) {
      // set initial publish date
      return { status, initialPublishedAt: new Date().toISOString() };
    }
  }

  // this is either an unpublish or a re-publish so simply return status
  return { status };
};

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
  console.log( '[x] PUBLISHING a publish PLAYBOOK create request' );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'create.playbook',
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
  console.log( '[x] PUBLISHING a publish PLAYBOOK delete request' );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'delete.playbook',
    data: {
      projectId: id,
      projectDirectory,
    },
  } );
};


export const publishUpdate = async ( id, data, status, projectDirectory ) => {
  console.log( '[x] PUBLISHING a publish PLAYBOOK update request' );

  await publishToChannel( {
    exchangeName: 'publish',
    routingKey: 'update.playbook',
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

  // 2. on successful result, using the returned projectId update db with applicable status
  // and initialPublishedAt date if playbook has never been published
  try {
    const data = await maybeSetInitialPublishDate( status, projectId );

    updateDatabase( projectId, data );
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
