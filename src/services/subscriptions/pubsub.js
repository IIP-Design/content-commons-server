import { AmqpPubSub } from 'graphql-rabbitmq-subscriptions';
import { ConsoleLogger } from '@cdm-logger/server';
// import socketio from 'socket.io';

import createRabbit from './createRabbit';


const exchange = process.env.RABBITMQ_EXCHANGE || 'publisher';

let rabbit = null;
// let io = null;

const settings = {
  level: 'info', // Optional: default 'info' ('trace'|'info'|'debug'|'warn'|'error'|'fatal')
  mode: 'short' // Optional: default 'short' ('short'|'long'|'dev'|'raw')
};

const logger = ConsoleLogger.create( 'PublisherServer', settings );
const pubsub = new AmqpPubSub( {
  config: {
    host: process.env.RABBITMQ_ENDPOINT
  },
  logger
} );

/**
 * Handler for messages received from RabbitMQ.
 * If it is an event, the event is broadcast to all sockets
 * joined to the room for the specified event type.
 * @param msg
 */
const rabbitConsumer = msg => {
  if ( !pubsub ) return;

  const obj = JSON.parse( msg );
  if ( 'event' in obj ) {
    console.info( `[PubSub][Rabbit] Received ${obj.type} event with ID: `, obj.event.id );
    pubsub.publish( obj.type, { [obj.type]: obj.event } );
  } else {
    console.warn( '[PubSub][Rabbit] Received non event', obj );
  }
};

// const createSocket = server => {
//   if ( io ) io.close();
//   io = socketio( server );
//   io.on( 'connection', client => {
//     console.info( '[PubSub][Socket] Client connected %s', client.id );
//     client.on( 'disconnect', () => {
//       console.info( '[PubSub][Socket] Client disconnected %s', client.id );
//     } );
//
//     client.on( 'join', type => {
//       client.join( type );
//       console.log( '[PubSub][Socket] Client joined: %s', type );
//     } );
//   } );
// };

/**
 * Connect to the RabbitMQ instance, and set the consumer function.
 */
export const connectRabbit = () => {
  rabbit = null;
  createRabbit( rabbitConsumer )
    .then( result => {
      rabbit = result;
      console.info( '[PubSub][Rabbit] Connected' );
    } )
    .catch( err => {
      console.error( err );
      console.log( '[PubSub][Rabbit] Connection failed: %s', err.toString() );
    } );
};

/**
 * Push an event to RabbitMQ and then ultimately to all subscribed clients.
 * @param type
 * @param event
 */
export const push = ( type, event ) => {
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

export default pubsub;
