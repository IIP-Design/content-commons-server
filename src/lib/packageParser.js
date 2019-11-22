const getS3Dir = value => value.substring( 0, value.lastIndexOf( '/' ) );

export const hasValidValue = value => value && value.trim() !== '';

export const getS3PackageDirectory = documents => {
  let s3Dir = null;

  documents.forEach( doc => {
    if ( !s3Dir ) {
      if ( hasValidValue( doc.url ) ) {
        s3Dir = getS3Dir( doc.url );
      }
    }
  } );

  return s3Dir;
};
