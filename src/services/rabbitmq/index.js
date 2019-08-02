// mport amqp from 'amqplib';
import initialize, { getConnection } from './initialize';
import {
  consumeSuccess as videoConsumeSuccess,
  consumeError as videoConsumeError
} from './video';

// Utility function to publish messages to a channel
export const publishToChannel = ( channel, { routingKey, exchangeName, data } ) => new Promise( ( resolve, reject ) => {
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

const handleConnectionEvents = connection => {
  // handle connection closed
  connection.on( 'close', () => console.log( 'Connection has been closed' ) );
  // handle errors
  connection.on( 'error', err => console.log( `Error: Connection error: ${err.toString()}` ) );
};

const consumeSuccess = async () => {
  const connection = await getConnection( 'consumer' );
  handleConnectionEvents( connection );

  const channel = await connection.createChannel();
  await channel.prefetch( 1 );

  channel.consume( 'publish.result', async msg => {
    videoConsumeSuccess( channel, msg );
  } );
};

const consumeErrors = async () => {
  const connection = await getConnection( 'consumer' );
  handleConnectionEvents( connection );

  const channel = await connection.createChannel();
  await channel.prefetch( 1 );

  channel.consume( 'publish.dlq', async msg => {
    videoConsumeError( channel, msg );
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
  await initialize().catch( err => console.error( err.cause ) );

  // listen for results on RabbitMQc
  listenForResults();
};
