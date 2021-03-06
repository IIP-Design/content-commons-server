import * as query from '../mocks/mockQueries/playbook';
import { playbook, languages } from '../mocks/mockData';
import createTestServer from '../../testServer/createTestServer';

jest.mock( '../../services/aws/s3', () => ( {
  getSignedUrlPromiseGet: () => ( {
    key: 'the-mock-key',
    url: 'https://signedurl.com',
  } ),
  getAssetPath: () => 'playbook/2021/06/commons.america.gov_ckp5t372c015607201qkzfuob',
} ) );

const getPlaybook = () => ( {
  ...playbook,
  author: jest.fn( () => playbook.author ),
  team: jest.fn( () => playbook.team ),
  categories: jest.fn( () => playbook.categories ),
  tags: jest.fn( () => playbook.tags ),
  content: jest.fn( () => playbook.content ),
  policy: jest.fn( () => playbook.policy ),
  supportFiles: jest.fn( () => playbook.supportFiles ),
  $fragment: jest.fn( () => ( { ...playbook } ) ),
} );

const getPrismaPlaybookFns = () => ( {
  playbook: jest.fn( () => getPlaybook() ),
  author: jest.fn( () => playbook.author ),
  team: jest.fn( () => playbook.team ),
  category: jest.fn( () => ( {
    translations: jest.fn( () => playbook.categories[0].translations ),
  } ) ),
  tag: jest.fn( () => ( {
    translations: jest.fn( () => playbook.tags[0].translations ),
  } ) ),
  content: jest.fn( () => playbook.content ),
  policy: jest.fn( () => playbook.policy ),
  supportFile: jest.fn( () => ( {
    language: jest.fn( () => playbook.supportFiles[0].language ),
  } ) ),
} );

describe( 'Query:', () => {
  it( 'playbooks returns the correct playbooks', async () => {
    const ctx = {
      user: {},
      prisma: {
        playbook: jest.fn( () => ( {
          author: jest.fn(),
          team: jest.fn(),
          categories: jest.fn(),
          tags: jest.fn(),
          content: jest.fn(),
          policy: jest.fn(),
          supportFiles: jest.fn(),
        } ) ),
        author: jest.fn(),
        team: jest.fn(),
        category: jest.fn( () => ( {
          translations: jest.fn(),
        } ) ),
        tag: jest.fn( () => ( {
          translations: jest.fn(),
        } ) ),
        content: jest.fn(),
        supportFile: jest.fn( () => ( {
          language: jest.fn(),
          use: jest.fn(),
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn(),
        } ) ),
        playbooks: jest.fn(),
      },
    };

    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.PLAYBOOKS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    /**
     * Use autogenerated mocks for sake of convenience (i.e.,
     * avoids having to manually create multiple supportFile
     * mocks). So check that no gql errors are returned
     * and that each top level field is truthy.
     */
    expect( result.errors ).not.toBeDefined();
    result.data.playbooks.forEach( pb => {
      const fields = Object.keys( pb );

      fields.forEach( field => {
        const value = pb[field];

        expect( value ).toBeTruthy();

        if ( typeof value === 'object' ) {
          const isArray = Array.isArray( value );
          const arr = isArray ? value : Object.keys( value );

          expect( arr.length ).toBeGreaterThan( 0 );
        }
      } );
    } );
  } );

  it( 'playbook returns a specific playbook', async () => {
    const ctx = {
      user: {},
      prisma: {
        ...getPrismaPlaybookFns(),
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
      query: query.PLAYBOOK_QUERY,
      variables: { id: playbook.id },
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.playbook ).toEqual( playbook );
  } );
} );

describe( 'Mutation:', () => {
  it( 'createPlaybook creates a playbook', async () => {
    const { title, type } = playbook;
    const ctx = {
      user: {},
      prisma: {
        ...getPrismaPlaybookFns(),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
        createPlaybook: jest.fn( () => playbook ),
        updatePlaybook: jest.fn( () => playbook ),
      },
    };

    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_PLAYBOOK_MUTATION,
      variables: { data: { title, type } },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createPlaybook ).toEqual( playbook );
  } );

  it( 'updatePlaybook updates a specific playbook', async () => {
    const { id } = playbook;
    const title = 'new playbook title';
    const updatedPlaybook = { ...playbook, title };
    const ctx = {
      user: {},
      prisma: {
        ...getPrismaPlaybookFns(),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
        updatePlaybook: jest.fn( () => updatedPlaybook ),
      },
    };

    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_PLAYBOOK_MUTATION,
      variables: {
        data: { title },
        where: { id },
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updatePlaybook ).toEqual( updatedPlaybook );
  } );
} );
