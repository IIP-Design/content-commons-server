import axios from 'axios';

const VIMEO_HEADERS = {
  Authorization: `bearer ${process.env.VIMEO_TOKEN}`,
  'Content-Type': 'application/json',
  Accept: 'application/vnd.vimeo.*+json;version=3.4'
};

const _deleteFromVimeo = async id => {
  try {
    await axios.delete( `https://api.vimeo.com/videos/${id}`, {
      headers: VIMEO_HEADERS
    } );
    return { success: true };
  } catch ( error ) {
    return { success: false, error };
  }
};


export const deleteAllFromVimeo = async ids => {
  if ( ids.length ) {
    // execute in parallel
    const deleteTasks = ids.map( id => _deleteFromVimeo( id ) );
    const results = await Promise.all( deleteTasks );
    return results;
  }
};

export const deleteFromVimeo = id => _deleteFromVimeo( id );
