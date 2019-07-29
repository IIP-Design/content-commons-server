import amqp from 'amqplib';
import { publishToChannel } from './index';
import { getS3ProjectDirectory } from '../../lib/projectParser';
import { prisma } from '../../schema/generated/prisma-client';


// Need to abstract video specific stuff so this file can remain generic
import { VIDEO_UNIT_VIDEO_FILES } from '../../fragments/video';

// RabbitMQ connection string
const messageQueueConnectionString = process.env.RABBITMQ_ENDPOINT;

const createChannel = async () => {
  const connection = await amqp.connect( messageQueueConnectionString );
  const channel = await connection.createConfirmChannel();
  return channel;
};

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

  // Connect to RabbitMQ and create a channel
  const channel = await createChannel();
  const projectDirectory = await _getS3ProjectDirectory( id );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'create',
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
  const channel = await createChannel();
  const projectDirectory = await _getS3ProjectDirectory( id );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'delete',
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
  // connect to Rabbit MQ and create a channel
  const channel = await createChannel();
  const projectDirectory = await _getS3ProjectDirectory( id );

  console.log( '[x] PUBLISHING a publish upate request' );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'update',
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
      status: 'PUBLISHED_MODIFIED',
      publishedAt: ( new Date() ).toISOString()
    } );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }
};

export const consumeSuccess = async ( channel, msg ) => {
  // parse message
  const { routingKey } = msg.fields;
  const msgBody = msg.content.toString();
  const data = JSON.parse( msgBody );
  const { projectId } = data;

  console.log( `[√] RECEIVED a publish ${routingKey} result for project ${projectId}` );

  // 1. on successful result, update db with applicable status using the returned projectId
  switch ( routingKey ) {
    case 'result.create.video':
      onPublishCreate( projectId );
      break;
    case 'result.update.video':
      onPublishUpdate( projectId );
      break;
    case 'result.delete.video':
      onPublishDelete( projectId );
      break;
    default:
      console.log( `Invalid result type: ${routingKey}` );
      break;
  }

  // 2. notify the react client

  // 3. acknowledge message as received
  await channel.ack( msg );
};

export const consumeError = async ( channel, msg ) => {
  const { routingKey } = msg.fields;
  const msgBody = msg.content.toString();
  const data = JSON.parse( msgBody );
  const { projectId, projectStatus } = data;

  console.log( `Unable to process queue ${routingKey} request for project : ${projectId} ` );

  try {
    updateDatabase( projectId, {
      status: projectStatus
    } );
  } catch ( err ) {
    console.log( `Error: ${err.message}` );
  }
};
