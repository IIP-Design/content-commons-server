

const getS3Dir = value => value.substring( 0, value.lastIndexOf( '/' ) );

export const getVimeoId = value => value.substr( value.lastIndexOf( '/' ) + 1 );
export const hasValidValue = value => value && value.trim() !== '';

export const getVimeoIds = stream => {
  const vimeo = [];
  if ( stream && stream.length ) {
    stream.forEach( s => {
      if ( hasValidValue( s.url ) ) {
        vimeo.push( getVimeoId( s.url ) );
      }
    } );
  }
  return vimeo;
};

export const getFilesToDelete = units => {
  let s3Dir = null;
  let vimeo = [];

  units.forEach( unit => {
    if ( unit.files && unit.files.length ) {
      unit.files.forEach( file => {
        // makes the assumption that all files to be deleted reside in same s3 subdir
        if ( !s3Dir ) {
          if ( hasValidValue( file.url ) ) {
            s3Dir = getS3Dir( file.url );
          }
        }

        const { stream } = file;
        vimeo = getVimeoIds( stream );
      } );
    }
  } );

  return { s3Dir, vimeo };
};
