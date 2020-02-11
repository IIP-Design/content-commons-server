import initialize, { getPublishChannel, getConsumerChannel } from './initialize';
import {
  consumeSuccess as videoConsumeSuccess,
  consumeError as videoConsumeError
} from './video';
import {
  consumeSuccess as packageConsumeSuccess,
  consumeError as packageConsumeError
} from './package';

// Utility function to parse messages
export const parseMessage = msg => {
  const { routingKey } = msg.fields;
  const msgBody = msg.content.toString();
  const data = JSON.parse( msgBody );
  const { projectId, projectStatus } = data;

  return { routingKey, projectId, projectStatus };
};

// Utility function to publish messages to a channel
export const publishToChannel = async ( { routingKey, exchangeName, data } ) => {
  const channel = await getPublishChannel( 'publish' );

  if ( channel ) {
    return new Promise( ( resolve, reject ) => {
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
  }
};


const consumeSuccess = async () => {
  const channel = await getConsumerChannel();
  await channel.prefetch( 1 );

  channel.consume( 'publish.result', async msg => {
    const { routingKey } = msg.fields; // result.create.video
    if ( routingKey.includes( 'video' ) ) {
      videoConsumeSuccess( channel, msg );
    } else if ( routingKey.includes( 'package' ) ) {
      packageConsumeSuccess( channel, msg );
    }
  } );
};

const consumeErrors = async () => {
  const channel = await getConsumerChannel();
  await channel.prefetch( 1 );

  channel.consume( 'publish.dlq', async msg => {
    const { routingKey } = msg.fields;
    if ( routingKey.includes( 'video' ) ) {
      videoConsumeError( channel, msg );
    } else if ( routingKey.includes( 'package' ) ) {
      packageConsumeError( channel, msg );
    }
  }, {
    noAck: true
  } );
};


const listenForResults = async () => {
  // start consuming messages
  consumeSuccess();
  consumeErrors();

  console.log( '[...] LISTENING for publish result' );
};

// Setup up RabbitMQ and start listening for publish results
export const initQueueAndStartListening = async () => {
  // initialize RabbitMQ Exchanges/Queues
  const isInitialized = await initialize().catch( err => console.error( err.cause ) );

  // Should we attempt restart if this fails and if so, how many times?

  if ( isInitialized ) {
    // listen for results on RabbitMQc
    listenForResults();
  }
};
