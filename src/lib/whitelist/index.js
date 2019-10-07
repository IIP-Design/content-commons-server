import fs from 'fs';
import csv from 'csv-parser';

export const isEmailWhitelisted = email => new Promise( resolve => {
  const file = 'email-whitelist.csv';
  fs.createReadStream( file )
    .pipe( csv() )
    .on( 'data', data => {
      if ( data.email.toLowerCase() === email.toLowerCase() ) {
        resolve( true );
      }
    } )
    .on( 'end', () => resolve( false ) );
} );
