import { prisma } from '../../src/schema/generated/prisma-client';
import {
  files, forEach, formatKeyVals, getCsvRows, prismaErrors,
} from './utils';

const seedTeams = async ( csvFile = files.teams ) => {
  // const teams = [];
  const rows = await getCsvRows( csvFile );

  return forEach( rows, data => {
    const team = formatKeyVals( data );

    if ( 'isConfirmed' in team ) team.isConfirmed = Boolean( team.isConfirmed );

    return prisma.upsertTeam( {
      where: {
        name: team.name,
      },
      create: team,
      update: team,
    } ).catch( err => {
      prismaErrors( err );

      return null;
    } );
  } ).then( results => results.filter( result => result !== null ) );
};

export default seedTeams;
