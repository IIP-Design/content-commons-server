import { deleteS3Asset } from '../../services/aws/s3';
import { DOCUMENT_FILE_URL } from '../../fragments/document';
import { hasValidValue } from '../../lib/projectParser';

const PUBLISHER_BUCKET = process.env.AWS_S3_AUTHORING_BUCKET;

/**
 * Removes both the document and its associated thumbnail image
 * @param {object} ctx graphQL context ohject
 * @param {string} id id of document fetch
 * @returns promises array
 */
export const deleteAsset = async ( ctx, id ) => {
  const promises = [];

  const document = await ctx.prisma
    .documentFile( { id } )
    .$fragment( DOCUMENT_FILE_URL );

  if ( document ) {
    const { url, image } = document;

    // document file
    if ( url && hasValidValue( url ) ) {
      promises.push( deleteS3Asset( url, PUBLISHER_BUCKET ) );
    }

    //  thumbnail image file
    if ( image && image[0] ) {
      if ( hasValidValue( image[0].url ) ) {
        promises.push( deleteS3Asset( image[0].url, PUBLISHER_BUCKET ) );
      }
    }
  }

  return promises;
};

/**
 *
 * @param {object} ctx graphQL context ohject
 * @param {array} assetsToDelete documents to delete
 * @returns Promise
 */
export const deleteAssets = async ( ctx, assetsToDelete ) => {
  if ( Array.isArray( assetsToDelete ) ) {
    return Promise.all( assetsToDelete.map( document => deleteAsset( ctx, document.id ) ) );
  }
};

// TODO - move from package resolver
export const createAsset = () => {};

// TODO - move from package resolver
export const createAssets = () => {};

// TODO - move from package resolver
export const publishAsset = () => {};
