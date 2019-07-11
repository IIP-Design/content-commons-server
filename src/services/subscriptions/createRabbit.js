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
    if ( !data || !data.queue ) return reject( new Error( 'Queue could not be created.' ) );

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

    if ( !channel ) return reject( new Error( 'Channel could not be created.' ) );
    channel.on( 'error', err => {
      console.error( '[Rabbit] channel error', err.message );
      reject( err );
    } );
    channel.on( 'close', () => {
      console.log( '[Rabbit] channel closed' );
      reject( new Error( 'Rabbit channel closed' ) );
    } );

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
    if ( !conn ) return reject( new Error( 'Connection to RabbitMQ failed.' ) );

    conn.on( 'error', err => {
      if ( err.message !== 'Connection closing' ) {
        console.error( '[Rabbit] Connection error', err.message );
      }
    } );
    conn.on( 'close', () => {
      console.error( '[Rabbit] Disconnected' );
    } );
    resolve( conn );
  } );
} );

/**
 * Creates a connection to RabbitMQ.
 * If a consumer is provided, it will be called whenever a message is received from Rabbit.
 * @param consumer?
 * @returns {Promise<any>}
 */
const createRabbit = async consumer => {
  if ( !consumer ) {
    throw new Error( 'Rabbit consumer is not defined.' );
  }
  try {
    const conn = await connectRabbit();
    const channel = await createChannel( conn );
    const queue = await createQueue( channel );

    channel.consume( queue, msg => {
      if ( msg.content ) {
        console.info( '[Rabbit] Received message: %s', msg.content.toString() );
        consumer( msg.content.toString() );
      }
    }, {
      noAck: true
    } );

    return channel;
  } catch ( error ) {
    throw error;
  }
};

export default createRabbit;
