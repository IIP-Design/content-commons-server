import { prisma } from '../../src/schema/generated/prisma-client';
import { files } from './seed.js';
import {
  forEachSync, getCsvRows, prismaErrors
} from './utils';

const seedUses = async ( csvFile = files.uses ) => {
  const rows = await getCsvRows( csvFile );
  const results = await forEachSync( rows, async row => {
    let upsert;
    switch ( row.type ) {
      case 'Image':
        upsert = prisma.upsertImageUse;
        break;
      case 'Video':
        upsert = prisma.upsertVideoUse;
        break;
      case 'Document':
        upsert = prisma.upsertDocumentUse;
        break;
      default: return null;
    }
    const { name, previous } = row;
    const args = {
      where: { name },
      create: { name },
      update: { name }
    };
    if ( previous ) {
      args.where = { name: previous };
    }
    return upsert( args ).catch( err => {
      if ( previous ) {
        args.where = { name };
        return upsert( args ).catch( err2 => {
          prismaErrors( err2 );
          return null;
        } );
      }
      prismaErrors( err );
      return null;
    } );
  } );
  return results;
};

export default seedUses;
