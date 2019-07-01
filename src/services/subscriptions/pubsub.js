import socketio from 'socket.io';
import createRabbit from './createRabbit';

const exchange = process.env.RABBITMQ_EXCHANGE || 'publisher';

let rabbit = null;
let io = null;

/**
 * Handler for messages received from RabbitMQ.
 * If it is an event, the event is broadcast to all sockets
 * joined to the room for the specified event type.
 * @param msg
 */
const rabbitConsumer = msg => {
  if ( !io ) return;

  const obj = JSON.parse( msg );
  if ( 'event' in obj ) {
    console.info( `[PubSub][Rabbit] Received ${obj.type} event with ID: `, obj.event.id );
    io.to( obj.type ).emit( obj.type, obj.event );
  } else {
    console.warn( '[PubSub][Rabbit] Received non event', obj );
  }
};

const createSocket = server => {
  if ( io ) io.close();
  io = socketio( server );
  io.on( 'connection', client => {
    console.info( '[PubSub][Socket] Client connected %s', client.id );
    client.on( 'disconnect', () => {
      console.info( '[PubSub][Socket] Client disconnected %s', client.id );
    } );

    client.on( 'join', type => {
      client.join( type );
    } );
  } );
};

/**
 * Connect to the RabbitMQ instance, and set the consumer function.
 */
const connectRabbit = () => {
  rabbit = null;
  createRabbit( rabbitConsumer )
    .then( result => {
      rabbit = result;
      console.info( '[PubSub][Rabbit] Connected' );
    } )
    .catch( err => console.error( err ) );
};

/**
 * Push an event to RabbitMQ and then ultimately to all subscribed clients.
 * @param type
 * @param event
 */
const push = ( type, event ) => {
  if ( !rabbit ) {
    console.error( '[PubSub][Rabbit] Message failed to send. Rabbit is not connected.' );
    return;
  }
  console.info( '[PubSub][Rabbit] Sending event', type );
  const payload = JSON.stringify( { type, event } );
  rabbit.publish( exchange, '', Buffer.from( payload ) );
};

/**
 * Starts the socket server, and creates a connection to the RabbitMQ instance.
 * @param server
 */
const connect = server => {
  createSocket( server );
  connectRabbit();
};

const pubsub = {
  push,
  connect
};

export default pubsub;
