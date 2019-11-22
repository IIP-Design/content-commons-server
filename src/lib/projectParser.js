import { hasValidValue } from './sharedParser';

export const getYouTubeId = url => {
  const reShort = /https:\/\/youtu.be\/(.*)/;
  const reLong = /https:\/\/www.youtube.com\/watch\?v=(.*)/;
  const idShort = url.match( reShort );
  const idLong = url.match( reLong );
  if ( idShort ) {
    return idShort[1];
  } if ( idLong ) {
    return idLong[1];
  }
  return null;
};

export const getVimeoId = url => {
  const regExp = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/;
  const match = url.match( regExp );

  if ( match ) {
    return match[1];
  }
  return '';
};

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
