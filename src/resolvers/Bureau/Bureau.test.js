import * as query from '../mocks/mockQueries/bureau';
import { bureaus } from '../mocks/mockData';
import createTestServer from '../../testServer/createTestServer';

describe( 'Query:', () => {
  it( 'bureaus returns the correct bureaus', async () => {
    const ctx = {
      prisma: {
        bureau: jest.fn( () => ( {
          offices: jest.fn( () => [] )
        } ) ),
        bureaus: jest.fn( () => bureaus )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.BUREAUS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.bureaus ).toEqual( bureaus );
  } );

  it( 'bureau returns a specific bureau', async () => {
    const bureau = bureaus[0];
    const ctx = {
      prisma: {
        bureau: jest.fn( () => ( {
          ...bureau,
          offices: jest.fn( () => bureau.offices )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.BUREAU_QUERY,
      variables: { id: bureau.id }
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.bureau ).toEqual( bureau );
  } );
} );

describe( 'Mutation:', () => {
  it( 'createBureau creates a bureau', async () => {
    const bureau = {
      id: 'new-bureau-1234',
      name: 'Bureau of ZZZZZ',
      abbr: 'ZZ',
      offices: []
    };
    const ctx = {
      prisma: {
        bureau: jest.fn( () => ( {
          ...bureau,
          offices: jest.fn( () => bureau.offices )
        } ) ),
        createBureau: jest.fn( () => bureau )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_BUREAU_QUERY,
      variables: { data: { ...bureau } }
    };
    const result = await server.mutate( request );
    const { createBureau } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( createBureau ).toEqual( bureau );
  } );
} );
