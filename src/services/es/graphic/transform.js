import { getUrlToProdS3 } from '..';

const transformLanguage = language => ( {
  language_code: language.languageCode,
  locale: language.locale,
  text_direction: language.textDirection.toLowerCase(),
  display_name: language.displayName,
  native_name: language.nativeName
} );


const transformSupportFile = file => {
  const {
    title,
    language,
    filename,
    filetype,
    visibility,
    url
  } = file;

  const supportFile = {
    title,
    visibility,
    filename,
    filetype,
    url: getUrlToProdS3( url ),
    language: transformLanguage( language )
  };

  return supportFile;
};

const transformImage = ( file, alt ) => {
  const { title, language, filename, filetype, filesize, visibility, url, dimensions, social, style } = file;

  const image = {
    title,
    visibility,
    filename,
    filetype,
    filesize,
    height: dimensions.height,
    width: dimensions.width,
    alt: alt || '',
    url: getUrlToProdS3( url ),
    language: transformLanguage( language ),
    style: style && style.name ? style.name : '',
    social: social.map( _social => _social.name )
  };

  return image;
};


/**
 * Convert a taxonomy field (categories/tags) into translated ES terms based on the provided language.
 *
 * @param taxonomyTerms
 * @param language
 * @returns {Array}
 */
const transformTaxonomy = ( taxonomyTerms, locale ) => {
  if ( !taxonomyTerms || !taxonomyTerms.length ) return [];
  const terms = [];

  taxonomyTerms.forEach( ( { translations = [] } ) => {
    const translation = translations.find( trans => trans.language.locale === locale );

    if ( translation ) {
      terms.push( translation.name );
    }
  } );

  return terms;
};


/**
 * Transforms data from a GraphicProject into a format accepted by the Public API
 * for Elastic Search.
 *
 * @param graphicProject
 * @returns object
 */
const transformGraphic = graphicProject => {
  const now = new Date().toISOString();
  const { id,
    createdAt,
    title,
    copyright,
    visibility,
    alt,
    team,
    desc,
    supportFiles,
    images,
    categories,
    tags } = graphicProject;

  const esData = {
    id,
    site: process.env.INDEXING_DOMAIN,
    title: title || '',
    type: 'graphic',
    published: now,
    modified: now,
    created: createdAt,
    desc,
    copyright,
    visibility,
    owner: team && team.name ? team.name : '',
    supportFiles: [],
    images: [],
    categories: transformTaxonomy( categories, 'en-us' ),
    tags: transformTaxonomy( tags, 'en-us' )
  };

  if ( supportFiles && supportFiles.length ) {
    esData.supportFiles = supportFiles.map( file => transformSupportFile( file ) );
  }

  if ( images && images.length ) {
    esData.images = images.map( image => transformImage( image, alt ) );
  }

  console.log( 'graphicProject', JSON.stringify( graphicProject, null, 2 ) );
  console.log( 'esdata', JSON.stringify( esData, null, 2 ) );

  return esData;
};

export default transformGraphic;
