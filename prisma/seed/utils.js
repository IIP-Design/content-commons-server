import fs from 'fs';
import csv from 'csv-parser';

export const ucfirst = string => String( string ).charAt( 0 ).toUpperCase() + string.slice( 1 );
export const lcfirst = string => String( string ).charAt( 0 ).toLowerCase() + string.slice( 1 );
export const printError = err => (typeof err === 'string' ? err : JSON.stringify( err, null, 2 ));

/**
 * Print error messages from a Prisma error object.
 *
 * @param result
 */
export const prismaErrors = result => {
  // printError( result.result );
  if ( result.result.errors.length > 0 ) {
    printError( result.result.errors.map( err => err.message ).join( '\n' ) );
    return;
  }
  printError( 'Prisma error.' );
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
    const camelKey = lcfirst( key.split( ' ' ).map( v => ucfirst( v ) ).join( '' ) );
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
 * @returns {Promise<void>}
 */
export const forEachSync = async ( obj, callback ) => {
  const entries = Object.entries( obj );
  for ( let i = 0; i < entries.length; i += 1 ) {
    const [key, val] = entries[i];
    // eslint-disable-next-line no-await-in-loop
    await callback( val, key );
  }
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
    promises.push( callback( val, key ) );
  }
  return Promise.all( promises );
};