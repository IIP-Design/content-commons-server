import { prisma } from '../../src/schema/generated/prisma-client';
import { files } from './seed.js';
import {
  formatKeyVals, getCsvRows, prismaErrors
} from './utils';

const bureauFrag = `
  fragment BureauFrag on Bureau {
    id
    name
    abbr
    isBureau
    offices {
      id
      name
    }
  }
`;

const officeFrag = `
  fragment officeFrag on Office {
    id
    name
    abbr
    bureau {
      id
      name
    }
  }
`;

function doFind( data ) {
  const fn = data.isBureau ? prisma.bureaus : prisma.offices;
  return fn( {
    where: {
      name: data.name,
      abbr: data.abbr
    }
  } )
    .$fragment( data.isBureau ? bureauFrag : officeFrag )
    .then( results => ( results && results.length ? results[0] : null ) )
    .catch( e => {
      prismaErrors( e );
      return null;
    } );
}

const seedBureaus = async ( csvFile = files.bureaus ) => {
  const rows = await getCsvRows( csvFile )
    .then( rs => rs.map( row => ( {
      ...formatKeyVals( row ),
      offices: {
        create: [],
        connect: []
      },
      isBureau: !!row.isBureau,
      node: null
    } ) ) );
  const bureaus = rows.filter( r => r.isBureau );
  const offices = rows.filter( r => !r.isBureau );
  const existingBureaus = await prisma.bureaus( {
    where: {
      name_in: bureaus.map( b => b.name )
    }
  } );
  existingBureaus.forEach( node => {
    const idx = bureaus.findIndex( b => b.name === node.name );
    if ( idx > -1 ) {
      bureaus[idx].node = node;
    }
  } );

  const existingOffices = await prisma.offices( {
    where: {
      name_in: offices.map( b => b.name )
    }
  } );
  existingOffices.forEach( node => {
    const idx = offices.findIndex( b => b.name === node.name );
    if ( idx > -1 ) {
      offices[idx].node = node;
    }
  } );
  const orphanOffices = [];
  offices.forEach( office => {
    if ( office.parent ) {
      const idx = bureaus.findIndex( b => b.name === office.parent );
      if ( idx > -1 ) {
        if ( office.node ) {
          bureaus[idx].offices.connect.push( { id: office.node.id } );
        } else {
          bureaus[idx].offices.create.push( {
            name: office.name,
            abbr: office.abbr
          } );
        }
        return;
      }
    }
    orphanOffices.push( office );
  } );
  const promises = [];
  bureaus.forEach( bureau => {
    const dataArg = {
      name: bureau.name,
      abbr: bureau.abbr,
      isBureau: bureau.isBureau,
      offices: {
        ...bureau.offices
      }
    };
    if ( bureau.node ) {
      promises.push(
        prisma.updateBureau( {
          data: dataArg,
          where: { id: bureau.node.id }
        } )
          .$fragment( bureauFrag )
          .catch( e => {
            prismaErrors( e );
            return null;
          } )
      );
    } else {
      promises.push(
        prisma.createBureau( dataArg )
          .$fragment( bureauFrag )
          .catch( e => {
            prismaErrors( e );
            return null;
          } )
      );
    }
  } );
  orphanOffices.forEach( async office => {
    const dataArg = {
      name: office.name,
      abbr: office.abbr
    };
    if ( office.parent ) {
      const foundBureau = await doFind( office.parent );
      if ( foundBureau ) {
        dataArg.bureau = { connect: { id: foundBureau.id } };
      }
    }
    if ( office.node ) {
      promises.push(
        prisma.updateOffice( {
          data: dataArg,
          where: { id: office.node.id }
        } )
          .$fragment( officeFrag )
          .catch( e => {
            prismaErrors( e );
            return null;
          } )
      );
    } else {
      promises.push(
        prisma.createOffice( dataArg )
          .$fragment( officeFrag )
          .catch( e => {
            prismaErrors( e );
            return null;
          } )
      );
    }
  } );
  return Promise.all( promises ).then( results => results.filter( result => !!result ) );
};

export default seedBureaus;
