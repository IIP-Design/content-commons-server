import pubsub from '../pubsub';
import { getConnection } from './initialize';
import { publishToChannel } from './index';
import { getS3ContentDirectory } from '../../lib/sharedParser';
import { prisma } from '../../schema/generated/prisma-client';

/**
 * This file is basically the same as `./video.js`.
 * Find a way to combine the two files.
 */
import { PACKAGE_DOCUMENT_FILES } from '../../fragments/package';

const PACKAGE_STATUS_CHANGE = 'PACKAGE_STATUS_CHANGE';

const createChannel = async () => {
  const connection = await getConnection( 'publisher' );
  const channel = await connection.createConfirmChannel();
  return channel;
};

const updateDatabase = async ( id, data, updateFn ) => {
  await prisma[updateFn]( { data, where: { id } } ).catch( err => console.error( err ) );
};

/**
 *
 * @param {string} id project/package id
 * @param {string} type project/package
 * @param {string} field name of the content field, e.g., documents, units
 * @param {string} fragment name of gql fragment
 */
const _getS3ContentDirectory = async ( id, type, field, fragment ) => {
  const units = await prisma[type]( { id } )[field]().$fragment( fragment );
  return getS3ContentDirectory( units, type );
};


/**
 * Put publish creation request on publish.create queue
 *
 * @param {string} id package id
 * @param {object} data package data
 *
 * NOTE: function name follows [exchange][routing key] convention
 */
export const publishCreate = async ( id, data, status ) => {
  // data.type: 'package'
  console.log( '[x] PUBLISHING a publish create request' );

  // Connect to RabbitMQ and create a channel
  const channel = await createChannel();
  const directory = await _getS3ContentDirectory( id, 'package', 'documents', PACKAGE_DOCUMENT_FILES );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'create',
    data: {
      packageId: id,
      packageStatus: status,
      packageJson: JSON.stringify( data ),
      packageDirectory: directory
    }
  } );

  channel.close();
};

const onPublishCreate = async packageId => {
  try {
    updateDatabase( packageId, {
      status: 'PUBLISHED',
      publishedAt: ( new Date() ).toISOString()
    }, 'updatePackage' );
    // notify the client
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }
};

/**
 * Put publish deletion request on publish.delete queue
 *
 * @param {string} id package id
 * @param {object} data package data
 *
 */
export const publishDelete = async id => {
  console.log( '[x] PUBLISHING a publish delete request' );

  // connect to Rabbit MQ and create a channel
  const channel = await createChannel();
  const directory = await _getS3ContentDirectory( id, 'package', 'documents', PACKAGE_DOCUMENT_FILES );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'delete',
    data: {
      packageId: id,
      packageDirectory: directory
    }
  } );

  channel.close();
};

const onPublishDelete = async packageId => {
  console.log( `onPublishDelete ${packageId}` );
  try {
    updateDatabase( packageId, {
      status: 'DRAFT',
      publishedAt: null
    }, 'updatePackage' );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }
};


export const publishUpdate = async ( id, data, status ) => {
  // connect to Rabbit MQ and create a channel
  const channel = await createChannel();
  const directory = await _getS3ContentDirectory( id, 'package', 'documents', PACKAGE_DOCUMENT_FILES );

  console.log( '[x] PUBLISHING a publish update request' );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'update',
    data: {
      packageId: id,
      packageStatus: status,
      packageJson: JSON.stringify( data ),
      packageDirectory: directory
    }
  } );

  channel.close();
};

const onPublishUpdate = async packageId => {
  try {
    updateDatabase( packageId, {
      status: 'PUBLISHED',
      publishedAt: ( new Date() ).toISOString()
    }, 'updatePackage' );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }
};

export const consumeSuccess = async ( channel, msg ) => {
  // parse message
  const { routingKey } = msg.fields;
  const msgBody = msg.content.toString();
  const data = JSON.parse( msgBody );
  const { packageId } = data;
  let status;

  console.log( `[√] RECEIVED a publish ${routingKey} result for package ${packageId}` );

  // 1. on successful result, update db with applicable status using the returned packageId
  switch ( routingKey ) {
    case 'result.create.package':
      onPublishCreate( packageId );
      status = 'PUBLISHED';
      break;

    case 'result.update.package':
      onPublishUpdate( packageId );
      status = 'PUBLISHED';
      break;

    case 'result.delete.package':
      onPublishDelete( packageId );
      status = 'DRAFT';
      break;

    default:
      console.log( `Invalid result type: ${routingKey}` );
      break;
  }

  // 2. notify the react client
  console.log( `NOTIFYING CLIENT: Package status changed to ${status}` );
  pubsub.publish( PACKAGE_STATUS_CHANGE, { packageStatusChange: { id: packageId, status, error: null } } );

  // 3. acknowledge message as received
  await channel.ack( msg );
};

export const consumeError = async ( channel, msg ) => {
  const { routingKey } = msg.fields;
  const msgBody = msg.content.toString();
  const data = JSON.parse( msgBody );
  const { packageId, packageStatus } = data;

  const errorMessage = `Unable to process queue ${routingKey} request for package : ${packageId} `;
  console.log( errorMessage );

  try {
    updateDatabase( packageId, {
      status: packageStatus
    }, 'updatePackage' );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }

  // 2. notify the react client
  console.log( `ERROR: NOTIFYING CLIENT of error: ${errorMessage}` );
  pubsub.publish( PACKAGE_STATUS_CHANGE, { packageStatusChange: { id: packageId, status: packageStatus, error: errorMessage } } );
};
