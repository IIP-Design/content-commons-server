import amqp from 'amqplib';
// import { AMQPPubSub } from 'graphql-amqp-subscriptions';

// RabbitMQ connection string
let messageQueueConnectionString = `amqp://${process.env.RABBITMQ_DOMAIN}:${process.env.RABBITMQ_PORT}`;

if ( process.env.RABBITMQ_VHOST ) {
  messageQueueConnectionString = `${messageQueueConnectionString}/%2F${process.env.RABBITMQ_VHOST}`;
}

let consumerConnection = null;
let publisherConnection = null;
let _consumerChannel = null;
let _publishChannel = null;

const connect = async () => amqp.connect( messageQueueConnectionString );

const handleConnectionEvents = connection => {
  // handle connection closed
  connection.on( 'close', () => console.log( 'Connection has been closed' ) );
  // handle errors
  connection.on( 'error', err => console.log( `Error: Connection error: ${err.toString()}` ) );
};

// Create separate connections for publisher and consumer
export const getConnection = async type => {
  if ( type === 'consumer' ) {
    if ( consumerConnection ) {
      return consumerConnection;
    }
    consumerConnection = await connect();

    return consumerConnection;
  }

  if ( publisherConnection ) {
    return publisherConnection;
  }
  publisherConnection = await connect();

  return publisherConnection;
};

// Use separaye publich and consumer channels for each thread (should we only be using 1 channel?)
export const getPublishChannel = async () => {
  if ( _publishChannel ) {
    return _publishChannel;
  }

  const connection = await getConnection( 'publish' )
    .catch( err => '[getPublishChannel] Unable to connect to RabbitMQ' );

  if ( connection ) {
    handleConnectionEvents( connection );
    _publishChannel = await connection.createConfirmChannel();

    return _publishChannel;
  }
};

// Use separaye publish and consumer channels for each thread (should we only be using 1 channel?)
export const getConsumerChannel = async () => {
  if ( _consumerChannel ) {
    return _consumerChannel;
  }

  const connection = await getConnection( 'consumer' )
    .catch( err => '[getConsumerChannel] Unable to connect to RabbitMQ' );

  if ( connection ) {
    handleConnectionEvents( connection );
    _consumerChannel = await connection.createChannel();

    return _consumerChannel;
  }
};


const setUpExchanges = async channel => {
  await Promise.all( [
    channel.assertExchange( 'publish', 'topic', { durable: true } ),
    channel.assertExchange( 'publish.dlx', 'fanout', { durable: true } ),
    channel.assertExchange( 'util', 'topic', { durable: true } ),
  ] );
};

const setUpQueues = async channel => {
  await Promise.all( [
    channel.assertQueue( 'publish.create', { durable: true, deadLetterExchange: 'publish.dlx' } ),
    channel.assertQueue( 'publish.update', { durable: true, deadLetterExchange: 'publish.dlx' } ),
    channel.assertQueue( 'publish.delete', { durable: true, deadLetterExchange: 'publish.dlx' } ),
    channel.assertQueue( 'publish.result', { durable: true, deadLetterExchange: 'publish.dlx' } ),
    channel.assertQueue( 'util.process', { durable: true, deadLetterExchange: 'publish.dlx' } ),
    channel.assertQueue( 'util.result', { durable: true, deadLetterExchange: 'publish.dlx' } ),
    channel.assertQueue( 'publish.dlq', { durable: true } ),
  ] );
};

const bindExhangesToQueues = async channel => {
  // channel.bindQueue( '[queueName], [exchange], [key])
  await Promise.all( [
    channel.bindQueue( 'publish.create', 'publish', 'create.*' ),
    channel.bindQueue( 'publish.update', 'publish', 'update.*' ),
    channel.bindQueue( 'publish.delete', 'publish', 'delete.*' ),
    channel.bindQueue( 'publish.result', 'publish', 'result.*.*' ),
    channel.bindQueue( 'util.process', 'util', 'convert.document' ),
    channel.bindQueue( 'util.result', 'util', 'convert.result' ),
    channel.bindQueue( 'publish.dlq', 'publish.dlx' ),
  ] );
};

const initalize = async () => {
  console.log( 'Setting up RabbitMQ Exchanges/Queues' );

  // connect to RabbitMQ Instance
  const connection = await connect();

  // create a channel
  const channel = await connection.createChannel();

  // create exchange
  await setUpExchanges( channel );

  // create queues
  await setUpQueues( channel );

  // bind queues - a message goes to the queues whose binding key exactly matches the routing key of the message
  await bindExhangesToQueues( channel );

  await channel.close();
  await connection.close();

  console.log( 'RabbitMQ initialization Complete' );

  return true;
};

export default initalize;
