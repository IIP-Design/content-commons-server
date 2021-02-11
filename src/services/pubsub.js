import { AmqpPubSub } from 'graphql-rabbitmq-subscriptions';
import { ConsoleLogger } from '@cdm-logger/server';

const settings = {
  level: 'info', // Optional: default 'info' ('trace'|'info'|'debug'|'warn'|'error'|'fatal')
  mode: 'short', // Optional: default 'short' ('short'|'long'|'dev'|'raw')
};

let port = process.env.RABBITMQ_PORT;

if ( process.env.RABBITMQ_VHOST ) {
  port = `${port}/%2F${process.env.RABBITMQ_VHOST}`;
}

const config = {
  host: process.env.RABBITMQ_DOMAIN,
  port,
};

const logger = ConsoleLogger.create( 'content-commons-server', settings );
const pubsub = new AmqpPubSub( {
  config,
  logger,
} );

export default pubsub;
