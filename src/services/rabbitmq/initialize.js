import amqp from 'amqplib';

// RabbitMQ connection string
const messageQueueConnectionString = process.env.RABBITMQ_ENDPOINT;

const initalize = async () => {
  console.log( 'Setting up RabbitMQ Exchanges/Queues' );

  // connect to RabbitMQ Instance
  const connection = await amqp.connect( messageQueueConnectionString );

  // create a channel
  const channel = await connection.createChannel();

  // create exchange
  await channel.assertExchange( 'publish', 'direct', { durable: true } );

  // create queues
  await channel.assertQueue( 'publish.create', { durable: true } );
  await channel.assertQueue( 'publish.update', { durable: true } );
  await channel.assertQueue( 'publish.delete', { durable: true } );
  await channel.assertQueue( 'publish.result', { durable: true } );

  // bind queues - a message goes to the queues whose binding key exactly matches the routing key of the message
  await channel.bindQueue( 'publish.create', 'publish', 'create' );
  await channel.bindQueue( 'publish.update', 'publish', 'update' );
  await channel.bindQueue( 'publish.delete', 'publish', 'delete' );
  await channel.bindQueue( 'publish.result', 'publish', 'result' );

  console.log( 'Initialization Complete' );
};

export default initalize;
