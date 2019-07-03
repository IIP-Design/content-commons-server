
const hasValidValue = value => value && value.trim() !== '';

export const getFilesToDelete = units => {
  const vimeo = [];
  let s3Dir = null;

  units.forEach( unit => {
    if ( unit.files && unit.files.length ) {
      unit.files.forEach( file => {
        // makes the assumption that all files to be deleted reside in same s3 subdir
        if ( !s3Dir ) {
          if ( hasValidValue( file.url ) ) {
            s3Dir = file.url.substring( 0, file.url.lastIndexOf( '/' ) );
          }
        }

        const { stream } = file;
        if ( stream && stream.length ) {
          stream.forEach( s => {
            if ( hasValidValue( s.url ) ) {
              vimeo.push( s.url.substr( s.url.lastIndexOf( '/' ) + 1 ) );
            }
          } );
        }
      } );
    }
  } );

  return { s3Dir, vimeo };
};
