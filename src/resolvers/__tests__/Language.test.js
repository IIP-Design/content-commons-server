import gql from 'graphql-tag';
import createTestServer from '../../testServer/createTestServer';

const LANGUAGE_FRAGMENT = gql`
  fragment languageDetails on Language {
    id
    languageCode
    locale
    textDirection
    displayName
    nativeName
  }
`;

const LANGUAGES_QUERY = gql`
  query Languages {
    languages {
      ...languageDetails
    }
  }
  ${LANGUAGE_FRAGMENT}
`;

const LANGUAGE_QUERY = gql`
  query Language($id: ID!) {
    language(id: $id) {
      ...languageDetails
    }
  }
  ${LANGUAGE_FRAGMENT}
`;

const LANGUAGE_TRANSLATIONS_QUERY = gql`
  query LanguageTranslations {
    languageTranslations {
      id
      name
      language {
        ...languageDetails
      }
    }
  }
  ${LANGUAGE_FRAGMENT}
`;

const LANGUAGE_TRANSLATION_QUERY = gql`
  query LanguageTranslation($id: ID!) {
    languageTranslation(id: $id) {
      id
      name
      language {
        ...languageDetails
      }
    }
  }
  ${LANGUAGE_FRAGMENT}
`;

const CREATE_LANGUAGE_MUTATION = gql`
  mutation CreateLanguage($data: LanguageCreateInput!) {
    createLanguage(data: $data) {
      ...languageDetails
    }
  }
  ${LANGUAGE_FRAGMENT}
`;

const UPDATE_LANGUAGE_MUTATION = gql`
  mutation UpdateLanguage(
    $data: LanguageUpdateInput!
    $where: LanguageWhereUniqueInput!
  ) {
    updateLanguage(data: $data, where: $where) {
      ...languageDetails
    }
  }
  ${LANGUAGE_FRAGMENT}
`;

describe( 'Query:', () => {
  const french = {
    id: 'ck2lzfx710hkp07206oo0icbv',
    languageCode: 'fr',
    locale: 'fr-fr',
    textDirection: 'LTR',
    displayName: 'French',
    nativeName: 'Français'
  };
  const english = {
    id: 'ck2lzfx710hkq07206thus6pt',
    languageCode: 'en',
    locale: 'en-us',
    textDirection: 'LTR',
    displayName: 'English',
    nativeName: 'English'
  };

  it( 'languages returns the correct languages', async () => {
    const languages = [french, english];
    const ctx = {
      prisma: { languages: jest.fn( () => languages ) }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: LANGUAGES_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.languages ).toEqual( languages );
  } );

  it( 'language returns a specific language', async () => {
    const language = english;
    const ctx = {
      prisma: {
        language: jest.fn( () => ( { ...language } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: LANGUAGE_QUERY,
      variables: { id: language.id }
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.language ).toEqual( { ...language } );
  } );

  it( 'languageTranslations returns the correct languageTranslations', async () => {
    const language = {
      id: 'test-lang-1234',
      languageCode: 'zz',
      locale: 'zz-zz',
      textDirection: 'LTR',
      displayName: 'Test Language',
      nativeName: 'Test Language'
    };
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
          language: jest.fn( () => language )
        } ) ),
        languageTranslations: jest.fn( () => languageTranslations )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: LANGUAGE_TRANSLATIONS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.languageTranslations )
      .toEqual( languageTranslations.map( translation => ( {
        ...translation, language
      } ) ) );
  } );

  it( 'languageTranslation returns a specific languageTranslation', async () => {
    const language = english;
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
      query: LANGUAGE_TRANSLATION_QUERY,
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
  const newLanguage = {
    id: 'new-lang-1234',
    languageCode: 'zz',
    locale: 'zz-zz',
    textDirection: 'LTR',
    displayName: 'New Language Name',
    nativeName: 'New Language'
  };

  it( 'createLanguage creates a language', async () => {
    const language = newLanguage;
    const ctx = {
      prisma: {
        createLanguage: jest.fn( () => ( { ...language } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: CREATE_LANGUAGE_MUTATION,
      variables: { data: { ...language } }
    };
    const result = await server.mutate( request );
    const { createLanguage } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( createLanguage ).toEqual( { ...language } );
  } );

  it( 'updateLanguage updates a language', async () => {
    const language = newLanguage;
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
    const request = { query: UPDATE_LANGUAGE_MUTATION, variables };
    const result = await server.mutate( request );
    const { updateLanguage } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( updateLanguage ).toEqual( { ...language } );
  } );
} );
