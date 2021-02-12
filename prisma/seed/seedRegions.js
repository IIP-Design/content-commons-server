import { prisma } from '../../src/schema/generated/prisma-client';
import {
  files, formatKeyVals, getCsvRows, prismaErrors,
} from './utils';

const regionFrag = `
  fragment regionFrag on Region {
    id
    name
    abbr
    countries {
      id
      name
    }
  }
`;

const countryFrag = `
  fragment countryFrag on Country {
    id
    name
    abbr
    region {
      id
      name
    }
  }
`;

function doFind( data ) {
  const fn = data.isRegion ? prisma.regions : prisma.countries;

  return fn( {
    where: {
      name: data.name,
      abbr: data.abbr,
    },
  } )
    .$fragment( data.isRegion ? regionFrag : countryFrag )
    .then( results => ( results && results.length ? results[0] : null ) )
    .catch( e => {
      prismaErrors( e );

      return null;
    } );
}

const seedRegions = async ( csvFile = files.regions ) => {
  const rows = await getCsvRows( csvFile )
    .then( rs => rs.map( row => ( {
      ...formatKeyVals( row ),
      countries: {
        create: [],
        connect: [],
      },
      isRegion: !!row.isRegion,
      node: null,
    } ) ) );
  const regions = rows.filter( r => r.isRegion );
  const countries = rows.filter( r => !r.isRegion );
  const existingRegions = await prisma.regions( {
    where: {
      name_in: regions.map( b => b.name ),
    },
  } );

  existingRegions.forEach( node => {
    const idx = regions.findIndex( b => b.name === node.name );

    if ( idx > -1 ) {
      regions[idx].node = node;
    }
  } );

  const existingCountries = await prisma.countries( {
    where: {
      name_in: countries.map( b => b.name ),
    },
  } );

  existingCountries.forEach( node => {
    const idx = countries.findIndex( b => b.name === node.name );

    if ( idx > -1 ) {
      countries[idx].node = node;
    }
  } );
  const orphanCountries = [];

  countries.forEach( country => {
    if ( country.parent ) {
      const idx = regions.findIndex( b => b.name === country.parent );

      if ( idx > -1 ) {
        if ( country.node ) {
          regions[idx].countries.connect.push( { id: country.node.id } );
        } else {
          regions[idx].countries.create.push( {
            name: country.name,
            abbr: country.abbr,
          } );
        }

        return;
      }
    }
    orphanCountries.push( country );
  } );
  const promises = [];

  regions.forEach( region => {
    const dataArg = {
      name: region.name,
      abbr: region.abbr,
      countries: {
        ...region.countries,
      },
    };

    if ( region.node ) {
      promises.push(
        prisma.updateRegion( {
          data: dataArg,
          where: { id: region.node.id },
        } )
          .$fragment( regionFrag )
          .catch( e => {
            prismaErrors( e );

            return null;
          } ),
      );
    } else {
      promises.push(
        prisma.createRegion( dataArg )
          .$fragment( regionFrag )
          .catch( e => {
            prismaErrors( e );

            return null;
          } ),
      );
    }
  } );
  orphanCountries.forEach( async country => {
    const dataArg = {
      name: country.name,
      abbr: country.abbr,
    };

    if ( country.parent ) {
      const foundRegion = await doFind( country.parent );

      if ( foundRegion ) {
        dataArg.region = { connect: { id: foundRegion.id } };
      }
    }
    if ( country.node ) {
      promises.push(
        prisma.updateCountry( {
          data: dataArg,
          where: { id: country.node.id },
        } )
          .$fragment( countryFrag )
          .catch( e => {
            prismaErrors( e );

            return null;
          } ),
      );
    } else {
      promises.push(
        prisma.createCountry( dataArg )
          .$fragment( countryFrag )
          .catch( e => {
            prismaErrors( e );

            return null;
          } ),
      );
    }
  } );

  return Promise.all( promises ).then( results => results.filter( result => !!result ) );
};

export default seedRegions;
