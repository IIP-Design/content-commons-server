import { prisma } from '../../src/schema/generated/prisma-client';
import { files } from './seed.js';
import {
  forEach, getCsvRows, prismaErrors
} from './utils';

const seedUses = async ( csvFile = files.uses ) => {
  const rows = await getCsvRows( csvFile );
  return forEach( rows, row => {
    let upsert;
    switch ( row.type ) {
      case 'Image':
        upsert = prisma.upsertImageUse;
        break;
      case 'Video':
        upsert = prisma.upsertVideoUse;
        break;
      default: return null;
    }
    const { name, previous } = row;
    return upsert( {
      where: { name: ( !previous ? name : previous ) },
      create: { name },
      update: { name }
    } ).catch( err => {
      prismaErrors( err );
      return null;
    } );
  } ).then( results => results.filter( result => result !== null ) );
};

export default seedUses;
