import { prisma } from '../../src/schema/generated/prisma-client';
import {
  files, forEach, formatKeyVals, getCsvRows, prismaErrors,
} from './utils';

const seedLanguages = async ( csvFile = files.languages ) => {
  // const languages = {};
  const rows = await getCsvRows( csvFile );

  return forEach( rows, data => {
    const language = formatKeyVals( data );

    return prisma.upsertLanguage( {
      where: {
        locale: language.locale,
      },
      create: language,
      update: language,
    } ).catch( e => {
      prismaErrors( e );

      return null;
    } );
  } ) // convert the language array into a locale keyed languages object
    .then( results => results.reduce( ( languages, lang ) => {
      if ( lang ) languages[lang.locale] = lang;

      return languages;
    }, {} ) );
};

export default seedLanguages;
