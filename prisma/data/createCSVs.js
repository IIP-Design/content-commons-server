import fs from 'fs';
import path from 'path';
import taxon from './taxonomy.json';

const createTaxCSVs = () => {
  const catcsv = fs.createWriteStream( path.join( __dirname, 'categories.csv' ) );
  const tagcsv = fs.createWriteStream( path.join( __dirname, 'tags.csv' ) );
  const locales = taxon.reduce( ( prev, curr ) => {
    Object.keys( curr.language ).forEach( lang => {
      if ( lang !== 'en' && !prev.includes( lang ) ) prev.push( lang );
    } );

    return prev;
  }, [] );
  const langs = {};

  locales.forEach( ( key, i ) => { langs[key] = i + 1; } );
  const header = ['id'].concat( locales ).join( ',' );

  catcsv.write( `${header}\n` );
  tagcsv.write( `${header}\n` );
  taxon.forEach( tax => {
    // rootid, langs
    const row = [tax._id];

    locales.forEach( () => row.push( '' ) );
    Object.keys( tax.language ).forEach( key => {
      row[langs[key]] = `"${tax.language[key]}"`;
    } );
    const str = row.join( ',' );

    if ( tax.primary ) catcsv.write( `${str}\n` );
    else tagcsv.write( `${str}\n` );
  } );
  catcsv.close();
  tagcsv.close();
};

createTaxCSVs();
