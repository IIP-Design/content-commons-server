import { prisma } from '../../src/schema/generated/prisma-client';
import {
  files, forEachSync, getCsvRows, printError, prismaErrors,
} from './utils';

const translationFragment = `
  fragment TranslationWithLanguage on LanguageTranslation {
    id
    name
    language {
      id
      locale
    }
  }
`;

const categoryFragment = `
  fragment CategoryWithTranslations on Category {
    id
    translations {
      id
      name
      language {
        locale
      }
    }
  }
`;

const tagFragment = `
  fragment TagWithTranslations on Tag {
    id
    translations {
      id
      name
      language {
        locale
      }
    }
  }
`;

const getLanguages = async () => {
  const languages = await prisma.languages();

  return languages.reduce( ( prev, curr ) => {
    prev[curr.locale] = curr;

    return prev;
  }, {} );
};

const processTerm = async ( type, translations ) => {
  if ( !translations.length ) return 'No translations provided.';
  let fragment;
  let prismaCreateTerm;
  let prismaUpdateTerm;
  let prismaTerms;

  switch ( type ) {
    case 'category':
      fragment = categoryFragment;
      prismaTerms = prisma.categories;
      prismaCreateTerm = prisma.createCategory;
      prismaUpdateTerm = prisma.updateCategory;
      break;
    case 'tag':
      fragment = tagFragment;
      prismaTerms = prisma.tags;
      prismaCreateTerm = prisma.createTag;
      prismaUpdateTerm = prisma.updateTag;
      break;
    default:
      throw new Error( `Invalid taxonomy type supplied to processTerm: ${type}` );
  }

  let term = null;
  const en = translations.find( trans => trans.language.locale === 'en-us' );

  if ( en ) {
    // Try to find a term with a matching english translation to update it
    try {
      const [foundTerm] = await prismaTerms( {
        where: {
          translations_some: {
            id: en.id,
          },
        },
      } ).$fragment( fragment );

      term = foundTerm;
    } catch ( e ) {
      // noop
    }
  }
  if ( term ) {
    // We found a matching term, so replace the translations with ones provided by the CSV
    const transIds = translations.map( trans => trans.id );
    const diff = term.translations.filter( trans => !transIds.includes( trans.id ) );
    const dataArg = {
      translations: {
        connect: transIds.map( id => ( { id } ) ),
      },
    };

    if ( diff.length > 0 ) dataArg.translations.disconnect = diff.map( trans => ( { id: trans.id } ) );

    return prismaUpdateTerm( {
      data: dataArg,
      where: {
        id: term.id,
      },
    } ).$fragment( fragment )
      .catch( e => {
        prismaErrors( e );

        return null;
      } );
  }

  return prismaCreateTerm( {
    translations: {
      connect: translations.map( trans => ( { id: trans.id } ) ),
    },
  } ).$fragment( fragment )
    .catch( e => {
      prismaErrors( e );

      return null;
    } );
};

const seedTaxonomies = async () => {
  const languages = await getLanguages();
  /**
   * Synchronously process translations.
   * We want to ensure that we don't recreate the same translation,
   * hence the synchronous approach.
   *
   * @param rows
   * @returns {Promise<Array>}
   */
  const processTranslations = async rows => {
    const terms = [];

    await forEachSync( rows, async data => {
      const translations = [];

      await forEachSync( data, async ( name, key ) => {
        if ( key === 'id' ) return;
        if ( !name || name === '' ) {
          printError( 'Empty translation for: ', key );

          return;
        }
        // Check that the language of this translation exists
        if ( !( key in languages ) ) {
          printError( `Language (${key}) not found for translation: ${name}` );

          return;
        }

        let [trans] = await prisma.languageTranslations( {
          where: {
            name,
            language: { locale: key },
          },
        } )
          .$fragment( translationFragment )
          .catch( () => null );

        if ( !trans ) {
          try {
            trans = await prisma.createLanguageTranslation( {
              name,
              language: {
                connect: { id: languages[key].id },
              },
            } ).$fragment( translationFragment );
          } catch ( e ) {
            printError( `Error on ${name}` );
            prismaErrors( e );
          }
        }
        if ( trans ) translations.push( trans );
      } );
      if ( translations.length ) terms.push( translations );
    } );

    return terms;
  };

  /**
   * Process the translations that compose a taxonomy term for the given taxonomy type.
   * Do not process if no terms were provided which can occur if there was an error earlier on.
   *
   * @param type
   * @param terms
   * @returns {*}
   */
  const processTerms = ( type, terms ) => {
    if ( terms === null ) return [];

    return Promise.all( terms.map( translations => processTerm( type, translations ) ) )
      .then( results => results.filter( result => result ) );
  };

  // Process all of the translations first to ensure we reuse translations where possible
  const catTranslations = await getCsvRows( files.categories ).then( processTranslations );
  const tagTranslations = await getCsvRows( files.tags ).then( processTranslations );

  return Promise.all( [
    processTerms( 'category', catTranslations ),
    processTerms( 'tag', tagTranslations ),
  ] )
    .then( results => ( {
      categories: results[0],
      tags: results[1],
    } ) );
};

export default seedTaxonomies;
