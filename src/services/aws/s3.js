const AWS = require( 'aws-sdk' );

const PUBLISHER_BUCKET = process.env.AWS_S3_PUBLISHER_BUCKET;

// Pulls in configs from .env
AWS.config.update( {
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
} );

const s3 = new AWS.S3();

const getKey = ( filename, projectId ) => {
  const fn = filename.replace( /\s+/g, '_' ).toLowerCase();

  const dateRegexp = /^(?<yr>[0-9]{4})\/(?<mth>[0-9]{2})\/(?<domain>[a-zA-Z0-9.]*)_/;
  const matches = projectId.match( dateRegexp );

  // Check if the projectId is a file path and if so, save to that path
  if ( matches ) {
    const { yr, mth, domain } = matches.groups;

    if ( yr && mth && domain ) {
      return `${projectId}/${fn}`;
    }
  }

  // if  yr, mth, domain are not present assume new project a
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  return `${year}/${month}/commons.america.gov_${projectId}/${fn}`;
};

export const getSignedUrlPromise = params => new Promise( ( resolve, reject ) => {
  const {
    contentType, filename, projectId
  } = params;

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

export const deleteAllS3Assets = async ( dir, bucket ) => {
  const listParams = {
    Bucket: bucket,
    Prefix: dir
  };

  const listedObjects = await s3.listObjectsV2( listParams ).promise();
  if ( listedObjects.Contents.length === 0 ) return;

  const deleteParams = {
    Bucket: bucket,
    Delete: { Objects: [] }
  };

  listedObjects.Contents.forEach( ( { Key } ) => {
    deleteParams.Delete.Objects.push( { Key } );
  } );

  await s3.deleteObjects( deleteParams ).promise();

  // If more than a page of files, delete next batch
  if ( listedObjects.IsTruncated ) await deleteAllS3Assets( dir, bucket );
};

export const deleteS3Asset = ( key, bucket ) => {
  const params = {
    Bucket: bucket,
    Key: key
  };

  return s3.deleteObject( params ).promise();
};

export const copyS3Asset = async ( key, fromBucket, toBucket ) => {
  const copyParams = {
    Bucket: toBucket,
    CopySource: `/${fromBucket}/${key}`,
    Key: key
  };
  return s3.copyObject( copyParams ).promise();
};

// This is currently executing in a worker in the cdp-api repo
// So may be able to remove here
export const copyS3AllAssets = async ( dir, fromBucket, toBucket ) => {
  const listParams = {
    Bucket: fromBucket,
    Prefix: dir
  };

  const listedObjects = await s3.listObjectsV2( listParams ).promise();
  if ( listedObjects.Contents.length === 0 ) return;

  listedObjects.Contents.forEach( ( { Key } ) => {
    copyS3Asset( Key, fromBucket, toBucket );
  } );

  // If more than a page of files, copy next batch
  if ( listedObjects.IsTruncated ) await copyS3AllAssets( dir );
};
