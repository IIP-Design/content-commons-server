const AWS = require( 'aws-sdk' );

const PUBLISHER_BUCKET = process.env.AWS_S3_PUBLISHER_UPLOAD_BUCKET;

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
    Bucket: PUBLISHER_BUCKET,
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

export const deleteAllFromS3 = async dir => {
  const listParams = {
    Bucket: PUBLISHER_BUCKET,
    Prefix: dir
  };

  const listedObjects = await s3.listObjectsV2( listParams ).promise();
  if ( listedObjects.Contents.length === 0 ) return;

  const deleteParams = {
    Bucket: PUBLISHER_BUCKET,
    Delete: { Objects: [] }
  };

  listedObjects.Contents.forEach( ( { Key } ) => {
    deleteParams.Delete.Objects.push( { Key } );
  } );

  await s3.deleteObjects( deleteParams ).promise();

  // If more than a page of files, delete next batch
  if ( listedObjects.IsTruncated ) await deleteAllFromS3( dir );
};

export const deleteFromS3 = key => {
  const params = {
    Bucket: PUBLISHER_BUCKET,
    Key: key
  };

  return s3.deleteObject( params ).promise();
};
