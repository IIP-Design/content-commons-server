import ffprobe from 'ffprobe-static';
import ffmpeg from 'fluent-ffmpeg';
import axios from 'axios';
import getStream from 'get-stream';
import mammoth from 'mammoth';
import xss from 'xss';
import { getSignedUrlPromiseGet } from '../services/aws/s3';

ffmpeg.setFfprobePath( ffprobe.path );

const exists = prop => ( !prop || prop === 'N/A' ? null : prop );

const probe = url => new Promise( ( resolve, reject ) => {
  ffmpeg.ffprobe( url, ( err, meta ) => {
    if ( err ) return reject( err );
    resolve( meta );
  } );
} );

export default {
  Mutation: {
    async getFileInfo  ( parent, args ) {
      const { path } = args;

      if ( !path ) {
        throw new Error( 'A file path must be provided' );
      }

      // All access to the authoring buckets requires creds
      const signed = await getSignedUrlPromiseGet( { key: path } );
      const metadata = await probe( signed.url ).catch( err => {
        throw new Error( `An error occurred: ${err}` );
      } );

      if ( metadata && metadata.streams ) {
        const info = metadata.streams.find( stream => stream.codec_type === 'video' );
        if ( info ) {
          const {
            /* eslint-disable-next-line camelcase */
            duration, bit_rate, width, height
          } = info;

          return ( {
            duration: exists( duration ) ? duration : null,
            /* eslint-disable-next-line camelcase */
            bitrate: exists( bit_rate ) ? bit_rate : null,
            width: exists( width ) ? width : null,
            height: exists( height ) ? height : null,
          } );
        }
      }

      return null;
    }
  }
};

/**
 * Strips tags and multiple spaces from a string of html
 * @param {string} string
 */
const htmlToText = ( string = '' ) => (
  string
    .replace( /<[\s\S]*?>/g, ' ' )
    .replace( /\t/g, ' ' )
    .replace( /\s{2,}/g, ' ' )
    .trim()
);

const getIndex = ( array, regex ) => (
  array.findIndex( n => regex.test( n ) )
);

const getLongestElement = markup => {
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

/**
 * Gets a remote docx as a Buffer
 * @param {string} url
 */
const getDocxBuffer = url => (
  axios.get( url, { responseType: 'stream' } )
    .then( async res => {
      if ( res.status === 200 ) {
        try {
          return await getStream.buffer( res.data );
        } catch ( error ) {
          console.log( error.bufferedData );
        }
      }
      return Buffer.from( [] );
    } )
    .then( buf => buf )
    .catch( err => console.log( err ) )
);

/**
 * Builds document.content & document.excerpt w/ converted docx content
 * @param {object} document
 * @param {object} input
 * @see https://github.com/mwilliamson/mammoth.js
 */
const setDocumentContent = async ( document, input ) => (
  mammoth.convertToHtml( input )
    .then( result => {
      if ( result.value ) {
        const sanitized = xss( result.value );
        document.excerpt = getLongestElement( sanitized );
        document.content = {
          create: {
            rawText: htmlToText( result.value ),
            html: sanitized,
            markdown: '' // omit md since not used by client
          }
        };
      }

      if ( result.messages && result.messages.length ) {
        result.messages.forEach( msg => console.log( msg ) );
      }
    } )
    .catch( err => console.log( err ) )
    .done()
);

/**
 * Converts docx content
 * @param {object} params
 */
export const convertDocxContent = async params => {
  const {
    id, data, ctx, isCreateAction
  } = params;

  if ( !isCreateAction ) return null;

  const document = data.documents.create[0];
  const signed = await getSignedUrlPromiseGet( { key: document.url } );
  const buffer = await getDocxBuffer( signed.url );

  await setDocumentContent( document, { buffer } )
    .then( () => (
      // call updatePackage to update data w/ document content
      ctx.prisma.updatePackage( {
        data: {}, // {} to avoid creating a document w/ no content
        where: { id }
      } )
    ) )
    .catch( err => console.log( err ) );
};
