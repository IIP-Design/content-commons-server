import { getPublishChannel } from './initialize';

const getIndex = ( array, regex ) => array.findIndex( n => regex.test( n ) );

export const getLongestElement = markup => {
  const elements = markup.split( /\s*<\/p>|<\/ul>|<\/ol>/ );

  /**
   * To improve chances of returning a relevant body
   * paragraph, slice the array to remove boilerplate
   * headings at top and clearances at bottom.
   */
  const start = getIndex( elements, /For\s*Immediate\s*Release/g );
  const end = getIndex( elements, /\x23\s*/g ); // for # # # line

  const longestElement = elements
    .slice( start === 0 ? start : start + 1, end )
    .sort( ( curr, next ) => next.length - curr.length );

  return longestElement[0] || '';
};

// Utility function to parse messages
export const parseMessage = msg => {
  const { routingKey } = msg.fields;
  const msgBody = msg.content.toString();
  const data = JSON.parse( msgBody );

  return { routingKey, data };
};

// Utility function to publish messages to a channel
export const publishToChannel = async ( { routingKey, exchangeName, data } ) => {
  const channel = await getPublishChannel( 'publish' );

  if ( channel ) {
    return new Promise( ( resolve, reject ) => {
      channel.publish( exchangeName,
        routingKey,
        Buffer.from( JSON.stringify( data ), 'utf-8' ),
        {
          persistent: true,
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
