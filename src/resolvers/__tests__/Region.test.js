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
  let countries;
  let regions;

  beforeEach( () => {
    countries = [
      {
        id: 'ck6krp96x3f3n0720q1289gee',
        name: 'Angola',
        abbr: 'AF'
      },
      {
        id: 'ck6krp9773f420720i7aesohq',
        name: 'Benin',
        abbr: 'AF'
      },
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

    regions = [
      {
        id: 'ck6krp96g3f3c0720c1w09bx1',
        name: 'Bureau of African Affairs',
        abbr: 'AF',
      },
      {
        id: 'ck6krp96o3f3g0720w7whw2pw',
        name: 'Bureau of East Asian and Pacific Affairs',
        abbr: 'EAP'
      }
    ];
  } );

  const getCountry = country => countries.find( c => c.name === country );
  const getRegion = region => regions.find( r => r.abbr === region );
  const getCountries = country => countries.filter( r => r.abbr === country );

  it( 'regions returns the correct regions', async () => {
    const regionsWithCountries = regions.map( r => ( {
      ...r,
      countries: getCountries( r.abbr )
    } ) );
    const ctx = {
      prisma: {
        region: jest.fn( () => ( {
          countries: jest.fn( () => {
            if ( ctx.prisma.region.mock.calls.length % 2 > 0 ) {
              return getCountries( 'AF' );
            }
            return getCountries( 'EAP' );
          } )
        } ) ),
        regions: jest.fn( () => regionsWithCountries )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: REGIONS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.regions ).toEqual( regionsWithCountries );
  } );

  it( 'region returns a specific region', async () => {
    const region = {
      ...regions[0], // AF
      countries: countries.filter( c => c.abbr === 'AF' )
    };
    const ctx = {
      prisma: {
        region: jest.fn( () => ( {
          ...region,
          countries: jest.fn( () => region.countries )
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
    const afRegion = getRegion( 'AF' );
    const eapRegion = getRegion( 'EAP' );
    const countriesWithRegion = [
      {
        ...getCountry( 'Angola' ),
        region: afRegion
      },
      {
        ...getCountry( 'Australia' ),
        region: eapRegion
      }
    ];
    const ctx = {
      prisma: {
        country: jest.fn( () => ( {
          region: jest.fn( () => {
            if ( ctx.prisma.country.mock.calls.length % 2 > 0 ) {
              return afRegion;
            }
            return eapRegion;
          } )
        } ) ),
        countries: jest.fn( () => countriesWithRegion )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: COUNTRIES_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.countries ).toEqual( countriesWithRegion );
  } );

  it( 'country returns a specific country', async () => {
    const region = getRegion( 'AF' );
    const country = {
      ...getCountry( 'Angola' ),
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
    const { createRegion } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( createRegion ).toEqual( { ...region, countries } );
  } );
} );
