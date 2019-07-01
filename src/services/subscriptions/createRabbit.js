import amqp from 'amqplib/callback_api';

const exchange = process.env.RABBITMQ_EXCHANGE || 'publisher';

/**
 * Connect as a subscriber to receieve events from other server instances.
 * @param channel
 * @returns {Promise<any>}
 */
const createQueue = channel => new Promise( ( resolve, reject ) => {
  channel.assertQueue( '', { exclusive: true }, ( err, data ) => {
    if ( err ) return reject( err );

    console.info( '[Rabbit] Waiting for messages in %s', data.queue );
    channel.bindQueue( data.queue, exchange, '' );
    resolve( data.queue );
  } );
} );

/**
 * Create channel to house the subscription transmissions.
 * @param conn
 * @returns {Promise<any>}
 */
const createChannel = conn => new Promise( ( resolve, reject ) => {
  conn.createChannel( ( err, channel ) => {
    if ( err ) return reject( err );

    channel.assertExchange( exchange, 'fanout', {
      durable: false
    } );

    resolve( channel );
  } );
} );

/**
 * Create a connection to the RabbitMQ server.
 * @returns {Promise<any>}
 */
const connectRabbit = () => new Promise( ( resolve, reject ) => {
  amqp.connect( process.env.RABBITMQ_ENDPOINT, ( err, conn ) => {
    if ( err ) return reject( err );
    resolve( conn );
  } );
} );

/**
 * Creates a connection to RabbitMQ.
 * If a consumer is provided, it will be called whenever a message is received from Rabbit.
 * @param consumer?
 * @returns {Promise<any>}
 */
const createRabbit = async ( consumer = null ) => {
  try {
    const conn = await connectRabbit();
    const channel = await createChannel( conn );
    const queue = await createQueue( channel );

    channel.consume( queue, msg => {
      if ( msg.content ) {
        console.info( '[Rabbit] Received message: %s', msg.content.toString() );
        if ( consumer ) consumer( msg.content.toString() );
      }
    }, {
      noAck: true
    } );

    return channel;
  } catch ( error ) {
    console.error( error );
  }
  return null;
};

export default createRabbit;
