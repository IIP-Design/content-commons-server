import gql from 'graphql-tag';
import createTestServer from '../../testServer/createTestServer';

const BUREAU_FRAGMENT = gql`
  fragment bureauDetails on Bureau {
    id
    name
    abbr
    offices {
      id
      name
      abbr
    }
  }
`;

const BUREAUS_QUERY = gql`
  query Bureaus {
    bureaus {
      ...bureauDetails
    }
  }
  ${BUREAU_FRAGMENT}
`;

const BUREAU_QUERY = gql`
  query Bureau($id: ID!) {
    bureau(id: $id) {
      ...bureauDetails
    }
  }
  ${BUREAU_FRAGMENT}
`;

const CREATE_BUREAU_QUERY = gql`
  mutation CreateBureau($data: BureauCreateInput!) {
    createBureau(data: $data) {
      ...bureauDetails
    }
  }
  ${BUREAU_FRAGMENT}
`;

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
    const request = { query: BUREAUS_QUERY };
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
      query: BUREAU_QUERY,
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
      query: CREATE_BUREAU_QUERY,
      variables: { data: { ...bureau } }
    };
    const result = await server.mutate( request );
    const { createBureau } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( createBureau ).toEqual( { ...bureau } );
  } );
} );
