import amqp from 'amqplib';
import initialize from './initialize';
import { prisma } from '../../schema/generated/prisma-client';

// RabbitMQ connection string
const messageQueueConnectionString = process.env.RABBITMQ_ENDPOINT;

// utility function to publish messages to a channel
const publishToChannel = ( channel, { routingKey, exchangeName, data } ) => new Promise( ( resolve, reject ) => {
  channel.publish( exchangeName,
    routingKey,
    Buffer.from( JSON.stringify( data ), 'utf-8' ), {
      persistent: true
    }, err => {
      if ( err ) {
        return reject( err );
      }

      resolve();
    } );
} );

// funcion name is [exchange][routing key]
export const publishCreate = async ( id, data, status ) => {
  // connect to Rabbit MQ and create a channel
  const connection = await amqp.connect( messageQueueConnectionString );
  const channel = await connection.createConfirmChannel();

  console.log( '[x] PUBLISHING a publish create request' );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'create',
    data: {
      projectId: id,
      projectJson: JSON.stringify( data ),
      projectStatus: status
    }
  } );
};

export const publishDelete = async ( id, data ) => {
  // connect to Rabbit MQ and create a channel
  const connection = await amqp.connect( messageQueueConnectionString );
  const channel = await connection.createConfirmChannel();

  console.log( '[x] PUBLISHING a publish delete request' );

  await publishToChannel( channel, {
    exchangeName: 'publish',
    routingKey: 'delete',
    data: {
      projectId: id,
      projectJson: JSON.stringify( data ),
      projectStatus: data.status
    }
  } );
};

// consume messages from RabbitMQ
const consume = ( { connection, channel, resultsChannel } ) => new Promise( ( resolve, reject ) => {
  channel.consume( 'publish.result', async msg => {
    // parse message
    const msgBody = msg.content.toString();
    const data = JSON.parse( msgBody );
    const { projectId, projectStatus, resultType } = data;

    // 1. on successful result, update db with status = PUBLISHED using the returned projectId
    // 2. notify the client
    console.log( `[x] RECEIVED a publish ${resultType} result for project ${projectId}`, data );
    switch ( resultType ) {
      case 'create':
        if ( !data.error ) {
          await prisma.updateVideoProject( { data: { status: 'PUBLISHED' }, where: { id: projectId } } )
            .then( () => console.log( 'Video project published', projectId ) )
            .catch( err => console.error( err ) );
        } else {
          await prisma.updateVideoProject( { data: { status: projectStatus }, where: { id: projectId } } )
            .then( () => console.log( 'Video project was NOT published', projectId ) )
            .catch( err => console.error( err ) );
        }
        break;
      case 'delete':
        if ( !data.error ) {
          await prisma.updateVideoProject( { data: { status: 'DRAFT' }, where: { id: projectId } } )
            .then( () => console.log( 'Video project unpublished', projectId ) )
            .catch( err => console.error( err ) );
        } else {
          const status = projectStatus === 'DRAFT' ? 'DRAFT' : 'PUBLISHED_MODIFIED';
          await prisma.updateVideoProject( { data: { status }, where: { id: projectId } } )
            .then( () => console.log( 'Video project published', projectId ) )
            .catch( err => console.error( err ) );
        }
        break;
      default:
        console.log( `Invalid result type: ${data.resultType}` );
        break;
    }

    // acknowledge message as received
    await channel.ack( msg );
  } );

  // handle connection closed
  connection.on( 'close', err => reject( err ) );

  // handle errors
  connection.on( 'error', err => reject( err ) );
} );


const listenForResults = async () => {
  // connect to Rabbit MQ
  const connection = await amqp.connect( messageQueueConnectionString );

  // create a channel and prefetch 1 message at a time
  const channel = await connection.createChannel();
  await channel.prefetch( 1 );

  console.log( '[x] LISTENING for publish result' );

  // start consuming messages
  await consume( { connection, channel } );
};

// Setup up RabbitMQ and start listening for publish results
export const start = async () => {
  // initialize RabbitMQ Exchanges/Queues
  await initialize().catch( err => console.error( err.cause ) );

  // listen for results on RabbitMQc
  listenForResults().then();
};
