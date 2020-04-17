import gql from 'graphql-tag';
import createTestServer from '../../testServer/createTestServer';

const REGION_FRAGMENT = gql`
  fragment regionDetails on Region {
    id
    name
    abbr
    countries {
      id
      name
      abbr
    }
  }
`;

const COUNTRY_FRAGMENT = gql`
  fragment countryDetails on Country {
    id
    name
    abbr
    region {
      id
      name
      abbr
    }
  }
`;

const REGIONS_QUERY = gql`
  query Regions {
    regions {
      ...regionDetails
    }
  }
  ${REGION_FRAGMENT}
`;

const REGION_QUERY = gql`
  query Region($id: ID!) {
    region(id: $id) {
      ...regionDetails
    }
  }
  ${REGION_FRAGMENT}
`;

const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      ...countryDetails
    }
  }
  ${COUNTRY_FRAGMENT}
`;

const COUNTRY_QUERY = gql`
  query country($id: ID!) {
    country(id: $id) {
      ...countryDetails
    }
  }
  ${COUNTRY_FRAGMENT}
`;

const CREATE_REGION_MUTATION = gql`
  mutation CreateRegion($data: RegionCreateInput!) {
    createRegion(data: $data) {
      ...regionDetails
    }
  }
  ${REGION_FRAGMENT}
`;

describe( 'Query:', () => {
  it( 'regions returns the correct regions', async () => {
    const afCountries = [
      {
        id: 'ck6krp96x3f3n0720q1289gee',
        name: 'Angola',
        abbr: 'AF'
      },
      {
        id: 'ck6krp9773f420720i7aesohq',
        name: 'Benin',
        abbr: 'AF'
      }
    ];
    const eapCountries = [
      {
        id: 'ck6krp9723f3x07209et0evkp',
        name: 'Australia',
        abbr: 'EAP'
      },
      {
        id: 'ck6krp97d3f4a0720zpndfxd7',
        name: 'Brunei',
        abbr: 'EAP'
      }
    ];
    const regions = [
      {
        id: 'ck6krp96g3f3c0720c1w09bx1',
        name: 'Bureau of African Affairs',
        abbr: 'AF',
        countries: afCountries
      },
      {
        id: 'ck6krp96o3f3g0720w7whw2pw',
        name: 'Bureau of East Asian and Pacific Affairs',
        abbr: 'EAP',
        countries: eapCountries
      }
    ];
    const ctx = {
      prisma: {
        region: jest.fn( () => ( {
          countries: jest.fn( () => {
            if ( ctx.prisma.region.mock.calls.length === 1 ) {
              return afCountries;
            }
            return eapCountries;
          } )
        } ) ),
        regions: jest.fn( () => regions )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: REGIONS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.regions ).toEqual( regions );
  } );

  it( 'region returns a specific region', async () => {
    const countries = [
      {
        id: 'ck6krp96x3f3n0720q1289gee',
        name: 'Angola',
        abbr: 'AF'
      },
      {
        id: 'ck6krp9773f420720i7aesohq',
        name: 'Benin',
        abbr: 'AF'
      }
    ];
    const region = {
      id: 'ck6krp96g3f3c0720c1w09bx1',
      name: 'Bureau of African Affairs',
      abbr: 'AF',
      countries
    };
    const ctx = {
      prisma: {
        region: jest.fn( () => ( {
          ...region,
          countries: jest.fn( () => countries )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: REGION_QUERY,
      variables: { id: region.id }
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.region ).toEqual( { ...region } );
  } );

  it( 'countries returns the correct countries', async () => {
    const afRegion = {
      id: 'ck6krp96g3f3c0720c1w09bx1',
      name: 'Bureau of African Affairs',
      abbr: 'AF'
    };
    const eapRegion = {
      id: 'ck6krp96o3f3g0720w7whw2pw',
      name: 'Bureau of East Asian and Pacific Affairs',
      abbr: 'EAP'
    };
    const countries = [
      {
        id: 'ck6krp96x3f3n0720q1289gee',
        name: 'Angola',
        abbr: 'AF',
        region: afRegion
      },
      {
        id: 'ck6krp9723f3x07209et0evkp',
        name: 'Australia',
        abbr: 'EAP',
        region: eapRegion
      }
    ];
    const ctx = {
      prisma: {
        country: jest.fn( () => ( {
          region: jest.fn( () => {
            if ( ctx.prisma.country.mock.calls.length === 1 ) {
              return afRegion;
            }
            return eapRegion;
          } )
        } ) ),
        countries: jest.fn( () => countries )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: COUNTRIES_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.countries ).toEqual( countries );
  } );

  it( 'country returns a specific country', async () => {
    const region = {
      id: 'ck6krp96g3f3c0720c1w09bx1',
      name: 'Bureau of African Affairs',
      abbr: 'AF'
    };
    const country = {
      id: 'ck6krp96x3f3n0720q1289gee',
      name: 'Angola',
      abbr: 'AF',
      region
    };
    const ctx = {
      prisma: {
        country: jest.fn( () => ( {
          ...country,
          region: jest.fn( () => region )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: COUNTRY_QUERY,
      variables: { id: country.id }
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.country ).toEqual( { ...country } );
  } );
} );

describe( 'Mutation:', () => {
  it( 'createRegion creates a region', async () => {
    const countries = [
      {
        id: 'test-country-1234',
        name: 'Test Country 1',
        abbr: 'ZZ'
      },
      {
        id: 'test-country-5678',
        name: 'Test Country 2',
        abbr: 'ZZ'
      }
    ];
    const region = {
      id: 'new-region-1234',
      name: 'Bureau of ZZZZZ',
      abbr: 'ZZ',
      countries: { create: countries }
    };
    const ctx = {
      prisma: {
        region: jest.fn( () => ( {
          ...region,
          countries: jest.fn( () => countries )
        } ) ),
        createRegion: jest.fn( () => ( { ...region } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: CREATE_REGION_MUTATION,
      variables: { data: { ...region } }
    };
    const result = await server.mutate( request );
    console.log( result );
    const { createRegion } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( createRegion ).toEqual( { ...region, countries } );
  } );
} );
