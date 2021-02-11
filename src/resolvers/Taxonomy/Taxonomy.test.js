import * as query from '../mocks/mockQueries/taxonomy';
import { categories, tags, languages } from '../mocks/mockData';
import createTestServer from '../../testServer/createTestServer';

describe( 'Query:', () => {
  it( 'categories returns the correct categories', async () => {
    const ctx = {
      user: {},
      prisma: {
        category: jest.fn( () => ( {
          translations: jest.fn( () => {
            if ( ctx.prisma.category.mock.calls.length % 2 > 0 ) {
              return categories[0].translations;
            }

            return categories[1].translations;
          } ),
        } ) ),
        categories: jest.fn( () => categories ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.CATEGORIES_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.categories ).toEqual( categories );
  } );

  it( 'category returns a specific category', async () => {
    const category = categories[0]; // about america
    const ctx = {
      user: {},
      prisma: {
        category: jest.fn( () => ( {
          ...category,
          translations: jest.fn( () => categories[0].translations ),
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.CATEGORY_QUERY,
      variables: { id: category.id },
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.category ).toEqual( category );
  } );

  it( 'tags returns the correct tags', async () => {
    const ctx = {
      user: {},
      prisma: {
        tag: jest.fn( () => ( {
          translations: jest.fn( () => {
            if ( ctx.prisma.tag.mock.calls.length % 2 > 0 ) {
              return tags[0].translations;
            }

            return tags[1].translations;
          } ),
        } ) ),
        tags: jest.fn( () => tags ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.TAGS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.tags ).toEqual( tags );
  } );

  it( 'tag returns a specific tag', async () => {
    const tag = tags[0]; // american culture
    const ctx = {
      user: {},
      prisma: {
        tag: jest.fn( () => ( {
          ...tag,
          translations: jest.fn( () => tags[0].translations ),
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.TAG_QUERY,
      variables: { id: tag.id },
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.tag ).toEqual( tag );
  } );
} );

describe( 'Mutation:', () => {
  const translations = [
    { ...categories[0].translations[0], name: 'new' },
    { ...categories[0].translations[1], name: 'nouvelle' },
  ];

  it( 'createCategory creates a category', async () => {
    const category = {
      ...categories[0],
      translations: {
        connect: [
          { id: languages.english.id },
          { id: languages.french.id },
        ],
      },
    };
    const ctx = {
      user: {},
      prisma: {
        category: jest.fn( () => ( {
          ...category,
          translations: jest.fn( () => translations ),
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
        createCategory: jest.fn( () => ( { ...category } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_CATEGORY_MUTATION,
      variables: { data: { ...category } },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createCategory ).toEqual( {
      ...category, translations,
    } );
  } );

  it( 'updateCategory updates a category', async () => {
    const category = {
      ...categories[0],
      translations: {
        disconnect: {
          id: translations[1].id,
        },
      },
    };
    const ctx = {
      user: {},
      prisma: {
        category: jest.fn( () => ( {
          ...category,
          translations: jest.fn( () => translations.slice( 0, 1 ) ),
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
        updateCategory: jest.fn( () => ( {
          ...category,
          translations: translations.slice( 0, 1 ),
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_CATEGORY_MUTATION,
      variables: {
        data: {
          translations: { ...category.translations },
        },
        where: { id: category.id },
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateCategory ).toEqual( {
      ...category,
      translations: translations.slice( 0, 1 ),
    } );
  } );

  it( 'createTag creates a tag', async () => {
    const tag = {
      ...tags[1],
      translations: {
        connect: [
          { id: languages.english.id },
          { id: languages.french.id },
        ],
      },
    };
    const ctx = {
      user: {},
      prisma: {
        tag: jest.fn( () => ( {
          ...tag,
          translations: jest.fn( () => translations ),
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
        createTag: jest.fn( () => ( { ...tag } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_TAG_MUTATION,
      variables: { data: { ...tag } },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createTag ).toEqual( {
      ...tag, translations,
    } );
  } );

  it( 'updateTag updates a tag', async () => {
    const tag = {
      ...tags[1],
      translations: {
        disconnect: {
          id: translations[1].id,
        },
      },
    };
    const ctx = {
      user: {},
      prisma: {
        tag: jest.fn( () => ( {
          ...tag,
          translations: jest.fn( () => translations.slice( 0, 1 ) ),
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
        updateTag: jest.fn( () => ( {
          ...tag,
          translations: translations.slice( 0, 1 ),
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_TAG_MUTATION,
      variables: {
        data: {
          translations: { ...tag.translations },
        },
        where: { id: tag.id },
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateTag ).toEqual( {
      ...tag,
      translations: translations.slice( 0, 1 ),
    } );
  } );
} );
