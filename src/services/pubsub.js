import { AmqpPubSub } from 'graphql-rabbitmq-subscriptions';
import { ConsoleLogger } from '@cdm-logger/server';

const settings = {
  level: 'trace', // Optional: default 'info' ('trace'|'info'|'debug'|'warn'|'error'|'fatal')
  mode: 'dev' // Optional: default 'short' ('short'|'long'|'dev'|'raw')
};

const logger = ConsoleLogger.create( 'content-commons-server', settings );
const pubsub = new AmqpPubSub( {
  config: {
    host: process.env.RABBITMQ_ENDPOINT
  },
  logger
} );

export default pubsub;

export const VIDEO_PUBLISHED = 'videoPublished';
export const VIDEO_PUBLISHING = 'videoPublishing';
export const VIDEO_UNPUBLISHED = 'videoUnpublished';
