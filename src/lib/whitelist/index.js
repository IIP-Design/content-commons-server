import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

export const isEmailWhitelisted = email => new Promise( resolve => {
  const file = path.join( __dirname, 'email-whitelist.csv' );

  fs.createReadStream( file )
    .pipe( csv() )
    .on( 'data', data => {
      if ( data.email.toLowerCase() === email.toLowerCase() ) {
        resolve( true );
      }
    } )
    .on( 'end', () => resolve( false ) );
} );
