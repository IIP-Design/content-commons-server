import 'dotenv/config';
import fs from 'fs';
import seedLanguages from './seedLanguages';
import seedTaxonomies from './seedTaxonomies';
import seedTeams from './seedTeams';
import seedBureaus from './seedBureaus';
import seedUses from './seedUses';
import seedRegions from './seedRegions';
import seedGraphicStyles from './seedGraphicStyles';
import seedSocialPlatforms from './seedSocialPlatorms';

export const files = {
  teams: './prisma/data/teams.csv',
  bureaus: './prisma/data/bureaus.csv',
  languages: './prisma/data/languages.csv',
  categories: './prisma/data/categories.csv',
  graphicStyles: './prisma/data/graphicStyles.csv',
  tags: './prisma/data/tags.csv',
  uses: './prisma/data/uses.csv',
  regions: './prisma/data/regions.csv',
  socialPlatforms: './prisma/data/socialPlatforms.csv',
};

/**
 * Seed Graph with languages, taxonomies, and teams.
 * Done asynchronously to prevent server errors, and duplicate entries.
 * Assumes CSV files can be found from the project root:
 * ./data/languages.csv
 * ./data/categories.csv
 * ./data/tags.csv
 * ./data/teams.csv
 * ./data/uses.csv
 * ./data/socialPlatforms.csv
 * ./data/graphicStyles.csv
 */
( async () => {
  const promises = [];

  if ( fs.existsSync( files.teams ) ) {
    const teamProm = seedTeams().then( teams => {
      console.log( `Created/updated ${teams.length} teams` );
    } )
      .catch( err => console.log( err ) );

    promises.push( teamProm );
  } else {
    console.error( `CSV not found: ${files.teams}\nTeams were not processed.` );
  }

  if ( fs.existsSync( files.bureaus ) ) {
    const burProm = seedBureaus().then( bureaus => {
      const counts = [0, 0];

      bureaus.forEach( result => {
        if ( 'offices' in result ) {
          counts[0] += 1;
          if ( result.offices ) {
            counts[1] += result.offices.length;
          }
        } else {
          counts[1] += 1;
        }
      } );
      console.log( `Created/updated ${counts[0] + counts[1]} bureaus/offices` );
    } )
      .catch( err => console.log( err ) );

    promises.push( burProm );
  } else {
    console.error( `CSV not found: ${files.bureaus}\nBureaus/Offices were not processed.` );
  }

  if ( fs.existsSync( files.regions ) ) {
    const regProm = seedRegions().then( regions => {
      const counts = [0, 0];

      regions.forEach( result => {
        if ( 'countries' in result ) {
          counts[0] += 1;
          if ( result.countries ) {
            counts[1] += result.countries.length;
          }
        } else {
          counts[1] += 1;
        }
      } );
      console.log( `Created/updated ${counts[0] + counts[1]} regions/countries` );
    } )
      .catch( err => console.log( err ) );

    promises.push( regProm );
  } else {
    console.error( `CSV not found: ${files.regions}\nRegions/Countries were not processed.` );
  }

  if ( fs.existsSync( files.uses ) ) {
    const usesProm = seedUses().then( uses => {
      console.log( `Created/updated ${uses.length} uses` );
    } )
      .catch( err => console.log( err ) );

    promises.push( usesProm );
  } else {
    console.error( `CSV not found: ${files.uses}\nUses were not processed.` );
  }

  if ( fs.existsSync( files.graphicStyles ) ) {
    const graphicStylesProm = seedGraphicStyles()
      .then( graphicStyles => {
        console.log( `Created/updated ${graphicStyles.length} graphicStyles` );
      } )
      .catch( err => console.log( err ) );

    promises.push( graphicStylesProm );
  } else {
    console.error( `CSV not found: ${files.graphicStyles}\ngraphicStyles were not processed.` );
  }

  if ( fs.existsSync( files.socialPlatforms ) ) {
    const socialPlatformsProm = seedSocialPlatforms().then( socialPlatforms => {
      console.log( `Created/updated ${socialPlatforms.length} socialPlatforms` );
    } )
      .catch( err => console.log( err ) );

    promises.push( socialPlatformsProm );
  } else {
    console.error( `CSV not found: ${files.socialPlatforms}\nsocialPlatforms were not processed.` );
  }

  if ( fs.existsSync( files.languages ) ) {
    // Synchronously do languages since we will probably need them below
    await seedLanguages().then( languages => {
      console.log( `Created/updated ${Object.keys( languages ).length} languages` );

      return languages;
    } )
      .catch( err => console.log( err ) );
  } else {
    console.error( `CSV not found: ${files.languages}\nLanguages were not processed.` );
  }

  const catsExist = fs.existsSync( files.categories );

  const tagsExist = fs.existsSync( files.tags );

  if ( catsExist && tagsExist ) {
    const taxProm = seedTaxonomies().then( tax => {
      console.log( `Created/updated ${tax.categories.length} categories\nCreated/updated ${tax.tags.length} tags` );
    } )
      .catch( err => console.log( err ) );

    promises.push( taxProm );
  } else {
    const errors = [];

    if ( !catsExist ) errors.push( `CSV not found: ${files.categories}` );
    if ( !tagsExist ) errors.push( `CSV not found: ${files.tags}` );
    errors.push( 'Taxonomies were not processed.' );
    console.error( errors.join( '\n' ) );
  }

  await Promise.all( promises );
} )();
