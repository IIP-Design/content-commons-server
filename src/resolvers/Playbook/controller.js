import { deleteS3Asset } from '../../services/aws/s3';
import { SUPPORT_FILE_FULL } from '../../fragments/common';
import { hasValidValue } from '../../lib/projectParser';

const PUBLISHER_BUCKET = process.env.AWS_S3_AUTHORING_BUCKET;

/**
 * Removes an individual file from the S3 authoring bucket.
 * @param {Object} ctx GraphQL context object.
 * @param {string} id The id of the file to be deleted.
 * @returns {Promise}
 */
export const deleteAsset = async ( ctx, id ) => {
  const file = await ctx.prisma
    .supportFile( { id } )
    .$fragment( SUPPORT_FILE_FULL );

  if ( file ) {
    const { url } = file;

    if ( url && hasValidValue( url ) ) {
      return deleteS3Asset( url, PUBLISHER_BUCKET );
    }
  }
};

/**
 * Iterates through an array of support files deleting each one.
 * @param {Object} ctx GraphQL context object.
 * @param {Object[]} assetsToDelete Files to delete.
 * @returns {Promise}
 */
export const deleteAssets = async ( ctx, assetsToDelete ) => {
  if ( Array.isArray( assetsToDelete ) ) {
    return Promise.all( assetsToDelete.map( file => deleteAsset( ctx, file.id ) ) );
  }
};
