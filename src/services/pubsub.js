import { AmqpPubSub } from 'graphql-rabbitmq-subscriptions';
import { ConsoleLogger } from '@cdm-logger/server';

const settings = {
  level: 'info', // Optional: default 'info' ('trace'|'info'|'debug'|'warn'|'error'|'fatal')
  mode: 'short' // Optional: default 'short' ('short'|'long'|'dev'|'raw')
};


const config = {
  host: process.env.RABBITMQ_DOMAIN
};

if ( process.env.RABBITMQ_PORT ) {
  config.port = process.env.RABBITMQ_PORT;
}

const logger = ConsoleLogger.create( 'content-commons-server', settings );
const pubsub = new AmqpPubSub( {
  config,
  logger
} );

export default pubsub;
