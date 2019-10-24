import ffprobe from 'ffprobe-static';
import ffmpeg from 'fluent-ffmpeg';
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
