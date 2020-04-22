import * as query from './queries/language';
import { languages as lang } from './mockData';
import createTestServer from '../../testServer/createTestServer';

describe( 'Query:', () => {
  it( 'languages returns the correct languages', async () => {
    const languages = [lang.french, lang.english];
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
        language: jest.fn( () => ( { ...language } ) )
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
    expect( result.data.language ).toEqual( { ...language } );
  } );

  it( 'languageTranslations returns the correct languageTranslations', async () => {
    const languageTranslations = [
      {
        id: 'ck2lzfxab0hls0720o2sjmoqw',
        name: 'about america'
      },
      {
        id: 'ck2lzfxc90hm60720onv6tbro',
        name: 'Amérique'
      }
    ];
    const ctx = {
      prisma: {
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => lang.testLanguage )
        } ) ),
        languageTranslations: jest.fn( () => languageTranslations )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.LANGUAGE_TRANSLATIONS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.languageTranslations )
      .toEqual( languageTranslations.map( translation => ( {
        ...translation, language: lang.testLanguage
      } ) ) );
  } );

  it( 'languageTranslation returns a specific languageTranslation', async () => {
    const language = lang.english;
    const languageTranslation = {
      id: 'ck2lzfxab0hls0720o2sjmoqw',
      name: 'about america',
      language: jest.fn( () => language )
    };
    const ctx = {
      prisma: {
        languageTranslation: jest.fn( () => languageTranslation )
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
    expect( result.data.languageTranslation ).toEqual( {
      ...languageTranslation,
      language
    } );
  } );
} );

describe( 'Mutation:', () => {
  it( 'createLanguage creates a language', async () => {
    const language = lang.testLanguage;
    const ctx = {
      prisma: {
        createLanguage: jest.fn( () => ( { ...language } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_LANGUAGE_MUTATION,
      variables: { data: { ...language } }
    };
    const result = await server.mutate( request );
    const { createLanguage } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( createLanguage ).toEqual( { ...language } );
  } );

  it( 'updateLanguage updates a language', async () => {
    const language = lang.testLanguage;
    const variables = {
      data: { displayName: language.displayName },
      where: { id: language.id }
    };
    const ctx = {
      prisma: {
        updateLanguage: jest.fn( () => ( { ...language } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: query.UPDATE_LANGUAGE_MUTATION, variables };
    const result = await server.mutate( request );
    const { updateLanguage } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( updateLanguage ).toEqual( { ...language } );
  } );
} );
