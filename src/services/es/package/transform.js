import { getUrlToProdS3 } from '../index';

const english = {
  language_code: 'en',
  locale: 'en-us',
  text_direction: 'ltr',
  display_name: 'English',
  native_name: 'English'
};


/**
 * Convert a taxonomy field (categories/tags) into translated ES terms based on the provided language.
 *
 * @param taxonomyTerms
 * @param language
 * @returns {Array}
 */
const transformTaxonomy = ( taxonomyTerms, language ) => {
  if ( !taxonomyTerms || !taxonomyTerms.length ) return [];
  const terms = [];
  taxonomyTerms.forEach( ( { translations = [] } ) => {
    const translation = translations.find( trans => trans.language.id === language.id );
    if ( translation ) {
      terms.push( translation.name );
    }
  } );
  return terms;
};

const transformLanguage = language => ( {
  language_code: language.languageCode,
  locale: language.locale,
  text_direction: language.textDirection.toLowerCase(),
  display_name: language.displayName,
  native_name: language.nativeName
} );

const transformDocument = ( document, team ) => {
  const now = new Date().toISOString();
  const {
    filename, filetype, title, language, visibility, content, excerpt, url, use, tags, bureaus, countries
  } = document;

  const doc = {
    id: document.id,
    site: process.env.INDEXING_DOMAIN,
    type: 'document',
    published: now,
    modified: now,
    visibility,
    owner: team,
    language: transformLanguage( language ),
    filename,
    filetype,
    title: title || '',
    excerpt,
    url: getUrlToProdS3( url ),
    use: use.name,
    tags: transformTaxonomy( tags, 'en-us' )
  };

  if ( content ) {
    doc.content = {};
    if ( content.rawText ) {
      doc.content.rawText = content.rawText;
    }
    if ( content.html ) {
      doc.content.html = content.html;
    }
    if ( content.markdown ) {
      doc.content.markdown = content.markdown;
    }
  }

  if ( bureaus && bureaus.length ) {
    doc.bureaus = bureaus.map( bureau => {
      const { id, name, abbr } = bureau;
      return { id, name, abbr };
    } );
  }

  if ( countries && countries.length ) {
    doc.countries = countries.map( country => {
      const { id, name, abbr } = country;
      return { id, name, abbr };
    } );
  }

  return doc;
};


/**
 * Transforms data from a Package into a format accepted by the Public API
 * for Elastic Search.
 *
 * @param pkg
 * @returns object
 */
const transformPackage = pkg => {
  const now = new Date().toISOString();
  const {
    id, createdAt, title, visibility, team, desc
  } = pkg;

  const esData = {
    id,
    site: process.env.INDEXING_DOMAIN,
    title: title || '',
    type: 'package',
    published: now,
    modified: now,
    created: createdAt,
    visibility,
    language: english,
    desc,
    owner: team && team.name ? team.name : '',
    documents: []
  };

  if ( pkg.documents && pkg.documents.length ) {
    esData.documents = pkg.documents.map( document => transformDocument( document, pkg.team.name ) );
  }

  console.log( 'package', JSON.stringify( pkg, null, 2 ) );
  console.log( 'esdata', JSON.stringify( esData, null, 2 ) );
  return esData;
};

export default transformPackage;
