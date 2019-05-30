import ffprobe from 'remote-ffprobe';

const exists = prop => ( !prop || prop === 'N/A' ? null : prop );

export default {
  Mutation: {
    async getFileInfo  ( parent, args, ctx ) {
      let { path } = args;

      if ( !path ) {
        throw new Error( 'A file path must be provided' );
      }

      path = `https://s3.amazonaws.com/${process.env.AWS_S3_PUBLISHER_UPLOAD_BUCKET}/${path}`;

      // @todo- adjust, if possible what ffprobe return to possibly speed things up
      const metadata = await ffprobe( path, { format: 'stream=video' } ).catch( err => {
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
