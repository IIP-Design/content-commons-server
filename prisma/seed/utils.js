import fs from 'fs';
import csv from 'csv-parser';

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

export const ucfirst = string => String( string ).charAt( 0 )
  .toUpperCase() + string.slice( 1 );
export const lcfirst = string => String( string ).charAt( 0 )
  .toLowerCase() + string.slice( 1 );
export const printError = err => console.error( typeof err === 'string' ? err : JSON.stringify( err, null, 2 ) );

export const getPrismaErrors = result => {
  if ( result && result.result && result.result.errors && result.result.errors.length > 0 ) {
    return result.result.errors.map( err => err.message ).join( '\n' );
  }

  return 'Prisma error.';
};

/**
 * Print error messages from a Prisma error object.
 *
 * @param result
 */
export const prismaErrors = result => {
  printError( getPrismaErrors( result ) );
};

/**
 * Convert keys to camelCase and return recrated object.
 *
 * @param data
 */
export const formatKeyVals = data => {
  const obj = {};

  Object.keys( data ).forEach( key => {
    if ( data[key] === null || data[key].length < 1 ) return;
    const camelKey = lcfirst( key.split( ' ' ).map( v => ucfirst( v ) )
      .join( '' ) );

    obj[camelKey] = data[key];
  } );

  return obj;
};

/**
 * Retreive array of rows ( key:value object array ) from a CSV file.
 *
 * @param file
 * @returns {Promise<any>}
 */
export const getCsvRows = file => new Promise( resolve => {
  const rows = [];

  fs.createReadStream( file )
    .pipe( csv() )
    .on( 'data', data => rows.push( data ) )
    .on( 'end', () => resolve( rows ) );
} );

/**
 * Handy iterator that synchronously iterates over an array OR an object.
 * forEach does not handle it well when you use the async keyword.
 *
 * @param obj
 * @param callback
 */
export const forEachSync = async ( obj, callback ) => {
  const entries = Object.entries( obj );
  const results = [];

  for ( let i = 0; i < entries.length; i += 1 ) {
    const [key, val] = entries[i];
    // eslint-disable-next-line no-await-in-loop, node/callback-return
    const result = await callback( val, key );

    results.push( result );
  }

  return results;
};

/**
 * Array.forEach replacement that asynchronously processes each entry (object or array) and
 * returns a Promise that resolves when all callbacks have resolved.
 *
 * @param obj
 * @param callback
 * @returns Promise
 */
export const forEach = ( obj, callback ) => {
  const promises = [];
  const entries = Object.entries( obj );

  for ( let i = 0; i < entries.length; i += 1 ) {
    const [key, val] = entries[i];

    promises.push( callback( val, key ) ); // eslint-disable-line node/callback-return
  }

  return Promise.all( promises );
};
