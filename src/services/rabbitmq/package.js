import pubsub from '../pubsub';
import { getConnection } from './initialize';
import { publishToChannel } from './index';
import { getS3ContentDirectory } from '../../lib/sharedParser';
import { prisma } from '../../schema/generated/prisma-client';

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
export const publishCreate = async params => {
  const {
    id, data, status, type, field, fragment
  } = params;
  console.log( '[x] PUBLISHING a publish create request' );

  // Connect to RabbitMQ and create a channel
  const channel = await createChannel();
  const directory = await _getS3ContentDirectory( id, type, field, fragment );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'create',
    data: {
      [`${type}Id`]: id,
      [`${type}Status`]: status,
      [`${type}Json`]: JSON.stringify( data ),
      [`${type}Directory`]: directory
    }
  } );

  channel.close();
};

const onPublishCreate = async ( id, updateFn ) => {
  try {
    updateDatabase( id, {
      status: 'PUBLISHED',
      publishedAt: ( new Date() ).toISOString()
    }, updateFn );
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
export const publishDelete = async params => {
  const {
    id, type, field, fragment
  } = params;
  console.log( '[x] PUBLISHING a publish delete request' );

  // connect to Rabbit MQ and create a channel
  const channel = await createChannel();
  const directory = await _getS3ContentDirectory( id, type, field, fragment );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'delete',
    data: {
      [`${type}Id`]: id,
      [`${type}Directory`]: directory
    }
  } );

  channel.close();
};

const onPublishDelete = async ( id, updateFn ) => {
  console.log( `onPublishDelete ${id}` );
  try {
    updateDatabase( id, {
      status: 'DRAFT',
      publishedAt: null
    }, updateFn );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }
};


export const publishUpdate = async params => {
  const {
    id, data, status, type, field, fragment
  } = params;
  // connect to Rabbit MQ and create a channel
  const channel = await createChannel();
  const directory = await _getS3ContentDirectory( id, type, field, fragment );

  console.log( '[x] PUBLISHING a publish update request' );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'update',
    data: {
      [`${type}Id`]: id,
      [`${type}Status`]: status,
      [`${type}Json`]: JSON.stringify( data ),
      [`${type}Directory`]: directory
    }
  } );

  channel.close();
};

const onPublishUpdate = async ( id, updateFn ) => {
  try {
    updateDatabase( id, {
      status: 'PUBLISHED',
      publishedAt: ( new Date() ).toISOString()
    }, updateFn );
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
      onPublishCreate( packageId, 'updatePackage' );
      status = 'PUBLISHED';
      break;

    case 'result.update.package':
      onPublishUpdate( packageId, 'updatePackage' );
      status = 'PUBLISHED';
      break;

    case 'result.delete.package':
      onPublishDelete( packageId, 'updatePackage' );
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
