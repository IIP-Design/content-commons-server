import { maybeGetUrlToProdS3, transformLanguage, transformThumbnails } from '../shared';

const THUMBNAIL_USE = 'Thumbnail/Cover Image';

/**
 * Transforms data from a Package into a format accepted by the Public API
 * for Elastic Search.
 *
 * @param pkg
 * @returns object
 */
const transformPackage = pkg => {
  const now = ( new Date() ).toISOString();

  const esData = {
    post_id: pkg.id,
    site: process.env.INDEXING_DOMAIN,
    type: 'package',
    published: now,
    modified: now,
    // owner: null,
    // author: null,
    // thumbnail: null,
    documents: [],
  };

  if ( pkg.team ) {
    esData.owner = pkg.team.name;
  }
  if ( pkg.author ) {
    esData.author = `${pkg.author.firstName} ${pkg.author.lastName}`.trim();
  }

  if ( pkg.documents ) {
    esData.documents = pkg.documents.map( doc => ( {
      srcUrl: maybeGetUrlToProdS3( doc.url ),
      language: transformLanguage( doc.language ),
      documentType: 'docx',
      visibility: doc.visibility
    } ) );
    console.log( pkg.documents );
    console.log( esData.documents );
  }

  // use the package document ImageFiles
  if ( !esData.thumbnail && pkg.documents && pkg.documents.length > 0 ) {
    const thumbs = pkg.documents.map( doc => (
      doc.image.filter( img => img.use.name === THUMBNAIL_USE )
    ) );
    esData.thumbnail = transformThumbnails( thumbs, false );
  }

  console.log( 'package', JSON.stringify( pkg, null, 2 ) );
  console.log( 'esdata', JSON.stringify( esData, null, 2 ) );
  return esData;
};

export default transformPackage;
