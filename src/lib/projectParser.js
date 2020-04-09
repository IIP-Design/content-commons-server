

const getS3Dir = value => value.substring( 0, value.lastIndexOf( '/' ) );


export const getYouTubeId = url => {
  const array = url.split( /(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/ );

  if ( array[2] !== undefined ) {
    return array[2].split( /[^0-9a-z_-]/i )[0];
  }

  return null;

  // const reShort = /https:\/\/youtu.be\/(.*)/;
  // const reLong = /https:\/\/www.youtube.com\/watch\?v=(.*)/;
  // const idShort = url.match( reShort );
  // const idLong = url.match( reLong );
  // if ( idShort ) {
  //   return idShort[1];
  // } if ( idLong ) {
  //   return idLong[1];
  // }
  // return null;
};

export const getVimeoId = url => {
  const regExp = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/;
  const match = url.match( regExp );

  if ( match ) {
    return match[1];
  }
  return '';
};

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

export const getS3ProjectDirectory = units => {
  let s3Dir = null;

  units.forEach( unit => {
    if ( unit.files && unit.files.length ) {
      unit.files.forEach( file => {
        // makes the assumption that all files to be deleted reside in same s3 subdir
        if ( !s3Dir ) {
          if ( hasValidValue( file.url ) ) {
            s3Dir = getS3Dir( file.url );
          }
        }
      } );
    }
  } );

  return s3Dir;
};

export const getVimeoFiles = units => {
  let vimeo = [];

  units.forEach( unit => {
    if ( unit.files && unit.files.length ) {
      unit.files.forEach( file => {
        const { stream } = file;
        vimeo = getVimeoIds( stream );
      } );
    }
  } );

  return vimeo;
};
