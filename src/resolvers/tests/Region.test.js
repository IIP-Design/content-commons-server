import * as query from './mockQueries/region';
import { countries as mockCountries, regions as mockRegions } from './mockData';
import createTestServer from '../../testServer/createTestServer';

describe( 'Query:', () => {
  let countries;
  let regions;

  beforeEach( () => {
    countries = mockCountries;
    regions = mockRegions;
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
    const request = { query: query.REGIONS_QUERY };
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
      query: query.REGION_QUERY,
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
    const request = { query: query.COUNTRIES_QUERY };
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
      query: query.COUNTRY_QUERY,
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
      query: query.CREATE_REGION_MUTATION,
      variables: { data: { ...region } }
    };
    const result = await server.mutate( request );
    const { createRegion } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( createRegion ).toEqual( { ...region, countries } );
  } );
} );
