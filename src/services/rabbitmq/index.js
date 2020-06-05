import initialize, { getPublishChannel, getConsumerChannel } from './initialize';
import video from './video';
import graphic from './graphic';
import pkg from './package';

// Utility function to parse messages
export const parseMessage = msg => {
  const { routingKey } = msg.fields;
  const msgBody = msg.content.toString();
  const data = JSON.parse( msgBody );

  return { routingKey, data };
};

// Utility function to publish messages to a channel
export const publishToChannel = async( { routingKey, exchangeName, data } ) => {
  const channel = await getPublishChannel( 'publish' );

  if ( channel ) {
    return new Promise( ( resolve, reject ) => {
      channel.publish( exchangeName,
        routingKey,
        Buffer.from( JSON.stringify( data ), 'utf-8' ),
        {
          persistent: true
        },
        err => {
          if ( err ) {
            return reject( err );
          }
          resolve();
        } );
    } );
  }
};


const consumePublishSuccess = async() => {
  const channel = await getConsumerChannel();

  await channel.prefetch( 1 );

  channel.consume( 'publish.result', msg => {
    if ( msg && msg.fields ) {
      const { routingKey } = msg.fields; // result.create.video

      if ( routingKey ) {
        if ( routingKey.includes( 'video' ) ) {
          video.consumeSuccess( channel, msg );
        } else if ( routingKey.includes( 'package' ) ) {
          pkg.consumePublishSuccess( channel, msg );
        } else if ( routingKey.includes( 'graphic' ) ) {
          graphic.consumeSuccess( channel, msg );
        }
        // TODO handle not having handler for routing keu
      }
      // TODO handle no routing key
    } else {
      console.log( 'ERROR [consumeSuccess] : Either msg or msg.fields is absent' );
    }
  } );
};

const consumeUtilSuccess = async() => {
  const channel = await getConsumerChannel();

  await channel.prefetch( 1 );

  channel.consume( 'util.result', msg => {
    const { routingKey } = msg.fields;

    console.log( `routingKey ${routingKey}` );
    if ( msg && msg.fields ) {
      if ( routingKey === 'convert.result' ) {
        console.log( 'process convert result' );
        pkg.consumeConvertSuccess( channel, msg );
      }
    } else {
      console.log( 'ERROR [consumeUtilSuccess] : Either msg or msg.fields is absent' );
    }
  } );
};

const consumeErrors = async() => {
  const channel = await getConsumerChannel();

  await channel.prefetch( 1 );

  channel.consume( 'publish.dlq', msg => {
    if ( msg && msg.fields ) {
      const { routingKey } = msg.fields;

      if ( routingKey ) {
        if ( routingKey.includes( 'video' ) ) {
          video.consumeError( channel, msg );
        } else if ( routingKey.includes( 'package' ) ) {
          pkg.consumeError( channel, msg );
        } else if ( routingKey.includes( 'graphic' ) ) {
          graphic.consumeError( channel, msg );
        }
        // TODO handle not having error handler for routing key
      }
      // TODO handle no routing key
    } else {
      console.log( 'ERROR [consumeErrors] : Either msg or msg.fields is absent' );
    }
  }, {
    noAck: true
  } );
};


const listenForResults = async() => {
  // start consuming messages
  consumePublishSuccess();
  consumeUtilSuccess();
  consumeErrors();

  console.log( '[...] LISTENING for queue results' );
};

// Setup up RabbitMQ and start listening for publish results
export const initQueueAndStartListening = async() => {
  // initialize RabbitMQ Exchanges/Queues
  const isInitialized = await initialize().catch( err => console.error( err.cause ) );

  // Should we attempt restart if this fails and if so, how many times?

  if ( isInitialized ) {
    // listen for results on RabbitMQc
    listenForResults();
  }
};
