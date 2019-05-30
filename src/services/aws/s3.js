const AWS = require( 'aws-sdk' );

// Pulls in configs from .env
AWS.config.update( {
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
} );

const s3 = new AWS.S3();

const getKey = ( filename, projectId ) => {
  const fn = filename.replace( /\s+/g, '_' ).toLowerCase();

  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  return `${year}/${month}/${projectId}/${fn}`;
};

export const getSignedUrlPromise = params => new Promise( ( resolve, reject ) => {
  const { contentType, filename, projectId } = params;

  const key = getKey( filename, projectId );

  s3.getSignedUrl( 'putObject', {
    Bucket: process.env.AWS_S3_PUBLISHER_UPLOAD_BUCKET,
    ContentType: contentType,
    Key: key
  }, ( err, url ) => {
    if ( err ) {
      reject( err );
    } else {
      resolve( { key, url } );
    }
  } );
} );
