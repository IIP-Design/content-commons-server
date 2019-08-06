import amqp from 'amqplib';

// RabbitMQ connection string
const messageQueueConnectionString = `amqp://${process.env.RABBITMQ_DOMAIN}:${process.env.RABBITMQ_PORT}`;

let consumerConnection = null;
let publisherConnection = null;

const connect = async () => amqp.connect( messageQueueConnectionString );

export const getConnection = async type => {
  if ( type === 'consumer' ) {
    if ( consumerConnection ) {
      return consumerConnection;
    }
    consumerConnection = connect();
    return consumerConnection;
  }

  if ( publisherConnection ) {
    return publisherConnection;
  }
  publisherConnection = connect();
  return publisherConnection;
};

const setUpExchanges = async channel => {
  await Promise.all( [
    channel.assertExchange( 'publish', 'topic', { durable: true } ),
    channel.assertExchange( 'publish.dlx', 'fanout', { durable: true } )
  ] );
};

const setUpQueues = async channel => {
  await Promise.all( [
    channel.assertQueue( 'publish.create', { durable: true, deadLetterExchange: 'publish.dlx' } ),
    channel.assertQueue( 'publish.update', { durable: true, deadLetterExchange: 'publish.dlx' } ),
    channel.assertQueue( 'publish.delete', { durable: true, deadLetterExchange: 'publish.dlx' } ),
    channel.assertQueue( 'publish.result', { durable: true, deadLetterExchange: 'publish.dlx' } ),
    channel.assertQueue( 'publish.dlq', { durable: true } )
  ] );
};

const bindExhangesToQueues = async channel => {
  // channel.bindQueue( '[queueName], [exchange], [key])
  await Promise.all( [
    channel.bindQueue( 'publish.create', 'publish', 'create' ),
    channel.bindQueue( 'publish.update', 'publish', 'update' ),
    channel.bindQueue( 'publish.delete', 'publish', 'delete' ),
    channel.bindQueue( 'publish.result', 'publish', 'result.*.*' ),
    channel.bindQueue( 'publish.dlq', 'publish.dlx' )
  ] );
};

const initalize = async () => {
  console.log( 'Setting up RabbitMQ Exchanges/Queues' );

  // connect to RabbitMQ Instance
  const connection = await amqp.connect( messageQueueConnectionString );

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
};

export default initalize;
