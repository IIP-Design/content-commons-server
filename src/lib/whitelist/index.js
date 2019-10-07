import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

export const isEmailWhitelisted = email => new Promise( resolve => {
  const file = path.join( __dirname, 'email-whitelist.csv' );
  const emails = [];
  fs.createReadStream( file )
    .pipe( csv() )
    .on( 'data', data => {
      if ( data.email.toLowerCase() === email.toLowerCase() ) {
        resolve( true );
      }
      emails.push( data.email );
    } )
    .on( 'end', () => {
      console.log( `email was not found in whitelist: ${email}` );
      console.log( emails );
      resolve( false );
    } );
} );
