import fs from 'fs';
import taxon from './taxonomy';

const createTaxCSVs = () => {
  const catcsv = fs.createWriteStream( './data/categories.csv' );
  const tagcsv = fs.createWriteStream( './data/tags.csv' );
  const locales = taxon.reduce( ( prev, curr ) => {
    Object.keys( curr.language ).forEach( lang => {
      if ( lang !== 'en' && !prev.includes( lang ) ) prev.push( lang );
    } );
    return prev;
  }, [] );
  const langs = {};
  locales.forEach( ( key, i ) => { langs[key] = i + 1; } );
  console.log( langs );
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
