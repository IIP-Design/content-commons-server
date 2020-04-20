import * as query from './queries/taxonomy';
import createTestServer from '../../testServer/createTestServer';

const enLanguage = {
  id: 'ck2lzfx710hkq07206thus6pt',
  languageCode: 'en',
  locale: 'en-us',
  textDirection: 'LTR',
  displayName: 'English',
  nativeName: 'English'
};
const frLanguage = {
  id: 'ck2lzfx710hkp07206oo0icbv',
  languageCode: 'fr',
  locale: 'fr-fr',
  textDirection: 'LTR',
  displayName: 'French',
  nativeName: 'Français'
};

// categories
const aboutAmerica = [
  {
    id: 'ck2lzfxab0hls0720o2sjmoqw',
    name: 'about america',
    language: enLanguage
  },
  {
    id: 'ck2lzfxc90hm60720onv6tbro',
    name: 'Amérique',
    language: frLanguage
  }
];
const artsCulture = [
  {
    id: 'ck2lzfxhj0hnq0720ea5fakmi',
    name: 'arts & culture',
    language: enLanguage
  },
  {
    id: 'ck2lzfxj90ho40720w9yrade3',
    name: 'Arts et culture',
    language: frLanguage
  }
];
const categories = [
  {
    id: 'ck2lzgu1c0re307202dlrnue2',
    translations: aboutAmerica
  },
  {
    id: 'ck2lzgu1c0re40720g36mhagr',
    translations: artsCulture
  }
];

// tags
const americanCulture = [
  {
    id: 'ck2lzfzwr0iey0720hrigffxo',
    name: 'american culture',
    language: enLanguage
  },
  {
    id: 'ck2lzfzxz0ifc0720ufzpx34l',
    name: 'Culture américaine',
    language: frLanguage
  }
];
const englishLearning = [
  {
    id: 'ck2lzg03a0igw0720t5c0s2r2',
    name: 'english learning',
    language: enLanguage
  },
  {
    id: 'ck2lzg04f0iha0720zkvmiruy',
    name: 'Anglais langue étrangère',
    language: frLanguage
  }
];
const tags = [
  {
    id: 'ck2lzgu1i0rei07206gvy1ygg',
    translations: americanCulture
  },
  {
    id: 'ck2lzgu1i0rej0720evrgjbyb',
    translations: englishLearning
  }
];

describe( 'Query:', () => {
  it( 'categories returns the correct categories', async () => {
    const ctx = {
      user: {},
      prisma: {
        category: jest.fn( () => ( {
          translations: jest.fn( () => {
            if ( ctx.prisma.category.mock.calls.length % 2 > 0 ) {
              return aboutAmerica;
            }
            return artsCulture;
          } )
        } ) ),
        categories: jest.fn( () => categories ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;
            if ( count % 2 > 0 ) {
              return enLanguage;
            }
            return frLanguage;
          } )
        } ) )
      }
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
          translations: jest.fn( () => aboutAmerica )
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;
            if ( count % 2 > 0 ) {
              return enLanguage;
            }
            return frLanguage;
          } )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.CATEGORY_QUERY,
      variables: { id: category.id }
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
              return americanCulture;
            }
            return englishLearning;
          } )
        } ) ),
        tags: jest.fn( () => tags ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;
            if ( count % 2 > 0 ) {
              return enLanguage;
            }
            return frLanguage;
          } )
        } ) )
      }
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
          translations: jest.fn( () => americanCulture )
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;
            if ( count % 2 > 0 ) {
              return enLanguage;
            }
            return frLanguage;
          } )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.TAG_QUERY,
      variables: { id: tag.id }
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.tag ).toEqual( tag );
  } );
} );

describe( 'Mutation:', () => {
  const translations = [
    { ...aboutAmerica[0], name: 'new' },
    { ...aboutAmerica[1], name: 'nouvelle' }
  ];

  it( 'createCategory creates a category', async () => {
    const category = {
      ...categories[0],
      translations: {
        connect: [
          { id: enLanguage.id },
          { id: frLanguage.id }
        ]
      }
    };
    const ctx = {
      user: {},
      prisma: {
        category: jest.fn( () => ( {
          ...category,
          translations: jest.fn( () => translations )
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;
            if ( count % 2 > 0 ) {
              return enLanguage;
            }
            return frLanguage;
          } )
        } ) ),
        createCategory: jest.fn( () => ( { ...category } ) ),
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_CATEGORY_MUTATION,
      variables: { data: { ...category } }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createCategory ).toEqual( {
      ...category, translations
    } );
  } );

  it( 'updateCategory updates a category', async () => {
    const category = {
      ...categories[0],
      translations: {
        disconnect: {
          id: translations[1].id
        }
      }
    };
    const ctx = {
      user: {},
      prisma: {
        category: jest.fn( () => ( {
          ...category,
          translations: jest.fn( () => translations.slice( 0, 1 ) )
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;
            if ( count % 2 > 0 ) {
              return enLanguage;
            }
            return frLanguage;
          } )
        } ) ),
        updateCategory: jest.fn( () => ( {
          ...category,
          translations: translations.slice( 0, 1 )
        } ) ),
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_CATEGORY_MUTATION,
      variables: {
        data: {
          translations: { ...category.translations }
        },
        where: { id: category.id }
      }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateCategory ).toEqual( {
      ...category,
      translations: translations.slice( 0, 1 )
    } );
  } );

  it( 'createTag creates a tag', async () => {
    const tag = {
      ...tags[1],
      translations: {
        connect: [
          { id: enLanguage.id },
          { id: frLanguage.id }
        ]
      }
    };
    const ctx = {
      user: {},
      prisma: {
        tag: jest.fn( () => ( {
          ...tag,
          translations: jest.fn( () => translations )
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;
            if ( count % 2 > 0 ) {
              return enLanguage;
            }
            return frLanguage;
          } )
        } ) ),
        createTag: jest.fn( () => ( { ...tag } ) ),
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_TAG_MUTATION,
      variables: { data: { ...tag } }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createTag ).toEqual( {
      ...tag, translations
    } );
  } );

  it( 'updateTag updates a tag', async () => {
    const tag = {
      ...tags[1],
      translations: {
        disconnect: {
          id: translations[1].id
        }
      }
    };
    const ctx = {
      user: {},
      prisma: {
        tag: jest.fn( () => ( {
          ...tag,
          translations: jest.fn( () => translations.slice( 0, 1 ) )
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;
            if ( count % 2 > 0 ) {
              return enLanguage;
            }
            return frLanguage;
          } )
        } ) ),
        updateTag: jest.fn( () => ( {
          ...tag,
          translations: translations.slice( 0, 1 )
        } ) ),
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_TAG_MUTATION,
      variables: {
        data: {
          translations: { ...tag.translations }
        },
        where: { id: tag.id }
      }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateTag ).toEqual( {
      ...tag,
      translations: translations.slice( 0, 1 )
    } );
  } );
} );
