import amqp from 'amqplib';
import initialize from './initialize';
import {
  consumeSuccess as videoConsumeSuccess,
  consumeError as videoConsumeError
} from './video';

// RabbitMQ connection string
const messageQueueConnectionString = process.env.RABBITMQ_ENDPOINT;

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


// consume messages from RabbitMQ
const consume = ( { connection, channel, resultsChannel } ) => new Promise( ( resolve, reject ) => {
  channel.consume( 'publish.result', async msg => {
    videoConsumeSuccess( channel, msg );
  } );

  channel.consume( 'publish.dlq', async msg => {
    videoConsumeError( channel, msg );
  }, {
    noAck: true
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

  console.log( '[...] LISTENING for publish result' );

  // start consuming messages
  await consume( { connection, channel } );
};

// Setup up RabbitMQ and start listening for publish results
export const initQueueAndStartListening = async () => {
  // initialize RabbitMQ Exchanges/Queues
  await initialize().catch( err => console.error( err.cause ) );

  // listen for results on RabbitMQc
  listenForResults();
};
