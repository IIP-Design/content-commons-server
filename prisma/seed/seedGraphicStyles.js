import { prisma } from '../../src/schema/generated/prisma-client';
import { files, forEachSync, getCsvRows, prismaErrors } from './utils';

const seedGraphicStyles = async ( csvFile = files.graphicStyles ) => {
  const rows = await getCsvRows( csvFile );
  const results = await forEachSync( rows, async row => {
    const upsert = prisma.upsertGraphicStyle;
    const { name, previous } = row;
    const args = {
      where: { name },
      create: { name },
      update: { name },
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

export default seedGraphicStyles;
