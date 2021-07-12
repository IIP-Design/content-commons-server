import { getUrlToProdS3 } from '..';

export const english = {
  language_code: 'en',
  locale: 'en-us',
  text_direction: 'ltr',
  display_name: 'English',
  native_name: 'English',
};

export const transformContent = content => {
  const tree = {};

  if ( content.rawText ) {
    tree.rawText = content.rawText;
  }
  if ( content.html ) {
    tree.html = content.html;
  }
  if ( content.markdown ) {
    tree.markdown = content.markdown;
  }

  return tree;
};

export const transformLanguage = language => ( {
  language_code: language.languageCode,
  locale: language.locale,
  text_direction: language.textDirection.toLowerCase(),
  display_name: language.displayName,
  native_name: language.nativeName,
} );

/**
 * Convert a taxonomy field (categories/tags) into translated ES terms
 * based on the provided language local.
 *
 * @param  {Array} taxonomyTerms
 * @param {String} locale
 * @returns {Array}
 */
export const transformTaxonomy = ( taxonomyTerms, locale ) => {
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

export const transformSupportFile = ( {
  title,
  language,
  filename,
  filesize,
  filetype,
  visibility,
  editable,
  url,
} ) => {
  const supportFile = {
    title,
    visibility,
    editable: editable || false,
    filename,
    filesize,
    filetype,
    url: getUrlToProdS3( url ),
    language: transformLanguage( language ),
  };

  return supportFile;
};
