import * as query from './mockQueries/language';
import { categories, languages as lang } from './mockData';
import createTestServer from '../../testServer/createTestServer';

describe( 'Query:', () => {
  it( 'languages returns the correct languages', async () => {
    const languages = [lang.english, lang.french];
    const ctx = {
      prisma: { languages: jest.fn( () => languages ) }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.LANGUAGES_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.languages ).toEqual( languages );
  } );

  it( 'language returns a specific language', async () => {
    const language = lang.english;
    const ctx = {
      prisma: {
        language: jest.fn( () => language )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.LANGUAGE_QUERY,
      variables: { id: language.id }
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.language ).toEqual( language );
  } );

  it( 'languageTranslations returns the correct languageTranslations', async () => {
    const languageTranslations = categories[0].translations;
    const ctx = {
      prisma: {
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return lang.english;
            }

            return lang.french;
          } )
        } ) ),
        languageTranslations: jest.fn( () => languageTranslations )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.LANGUAGE_TRANSLATIONS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.languageTranslations ).toEqual( languageTranslations );
  } );

  it( 'languageTranslation returns a specific languageTranslation', async () => {
    const languageTranslation = categories[0].translations[0];
    const ctx = {
      prisma: {
        languageTranslation: jest.fn( () => ( {
          ...languageTranslation,
          language: jest.fn( () => lang.english )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.LANGUAGE_TRANSLATION_QUERY,
      variables: { id: languageTranslation.id }
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.languageTranslation ).toEqual( languageTranslation );
  } );
} );

describe( 'Mutation:', () => {
  it( 'createLanguage creates a language', async () => {
    const language = lang.testLanguage;
    const ctx = {
      prisma: {
        createLanguage: jest.fn( () => language )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_LANGUAGE_MUTATION,
      variables: { data: { ...language } }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createLanguage ).toEqual( language );
  } );

  it( 'updateLanguage updates a language', async () => {
    const language = lang.testLanguage;
    const variables = {
      data: { displayName: language.displayName },
      where: { id: language.id }
    };
    const ctx = {
      prisma: {
        updateLanguage: jest.fn( () => language )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: query.UPDATE_LANGUAGE_MUTATION, variables };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateLanguage ).toEqual( language );
  } );
} );
