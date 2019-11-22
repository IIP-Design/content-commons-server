export const getS3Dir = value => value.substring( 0, value.lastIndexOf( '/' ) );

export const hasValidValue = value => value && value.trim() !== '';

/**
 * Returns the S3 directory where files reside
 * @param {array} units array of content objects
 * @param {string} type type of content: project/package
 * @returns {string} name of S3 directory
 */
export const getS3ContentDirectory = ( units, type = 'project' ) => {
  type.toLowerCase();
  let s3Dir = null;

  const assignS3Dir = url => {
    if ( !s3Dir ) {
      if ( hasValidValue( url ) ) {
        s3Dir = getS3Dir( url );
      }
    }
  };

  units.forEach( unit => {
    if ( type === 'project' && unit.files && unit.files.length ) {
      unit.files.forEach( file => {
        assignS3Dir( file.url );
      } );
    } else {
      assignS3Dir( unit.url );
    }
  } );

  return s3Dir;
};
