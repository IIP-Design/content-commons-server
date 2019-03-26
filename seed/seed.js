import 'dotenv/config';
import fs from 'fs';
import seedLanguages from './seedLanguages';
import seedTaxonomies from './seedTaxonomies';
import seedTeams from './seedTeams';
import seedUses from './seedUses';

export const files = {
  teams: './data/teams.csv',
  languages: './data/languages.csv',
  categories: './data/categories.csv',
  tags: './data/tags.csv',
  uses: './data/uses.csv'
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
 */
( async () => {
  const promises = [];
  if ( fs.existsSync( files.teams ) ) {
    const teamProm = seedTeams().then( teams => {
      console.log( `Created/updated ${teams.length} teams` );
    } );
    promises.push( teamProm );
  } else {
    console.error( `CSV not found: ${files.teams}\nTeams were not processed.` );
  }
  if ( fs.existsSync( files.uses ) ) {
    const usesProm = seedUses().then( uses => {
      console.log( `Created/updated ${uses.length} uses` );
    } );
    promises.push( usesProm );
  } else {
    console.error( `CSV not found: ${files.uses}\nUses were not processed.` );
  }
  if ( fs.existsSync( files.languages ) ) {
    // Synchronously do languages since we will probably need them below
    await seedLanguages().then( languages => {
      console.log( `Created/updated ${Object.keys( languages ).length} languages` );
      return languages;
    } );
  } else {
    console.error( `CSV not found: ${files.languages}\nLanguages were not processed.` );
  }
  const catsExist = fs.existsSync( files.categories );
  const tagsExist = fs.existsSync( files.tags );
  if ( catsExist && tagsExist ) {
    const taxProm = seedTaxonomies().then( tax => {
      console.log( `Created/updated ${tax.categories.length} categories\nCreated/updated ${tax.tags.length} tags` );
    } );
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
