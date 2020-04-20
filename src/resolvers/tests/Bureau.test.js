import * as query from './queries/bureau';
import createTestServer from '../../testServer/createTestServer';

describe( 'Query:', () => {
  const offices = [];

  it( 'bureaus returns the correct bureaus', async () => {
    const bureaus = [
      {
        id: 'ck5cvpjcu01k80720d2eouy43',
        name: 'Bureau of African Affairs',
        abbr: 'AF',
        offices
      },
      {
        id: 'ck5cvpjcv01k90720vvw2imhn',
        name: 'Bureau of Budget and Planning',
        abbr: 'BP',
        offices
      },
      {
        id: 'ck5cvpjcv01ka0720kruynq52',
        name: 'Bureau of Consular Affairs',
        abbr: 'CA',
        offices
      }
    ];
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
    const bureau = {
      id: 'ck5cvpjcu01k80720d2eouy43',
      name: 'Bureau of African Affairs',
      abbr: 'AF',
      offices: jest.fn( () => offices )
    };
    const ctx = {
      prisma: {
        bureau: jest.fn( () => ( { ...bureau } ) )
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
    expect( result.data.bureau ).toEqual( { ...bureau, offices } );
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
          offices: jest.fn( () => [] )
        } ) ),
        createBureau: jest.fn( () => ( { ...bureau } ) )
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
    expect( createBureau ).toEqual( { ...bureau } );
  } );
} );
