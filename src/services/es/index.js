/**
 * Prepend the prod S3 path if needed
 * @param {string} url
 */
export function maybeGetUrlToProdS3( url ) {
  if ( url.startsWith( 'http:' ) || url.startsWith( 'https:' ) ) return url;
  return `https://${process.env.AWS_S3_PRODUCTION_BUCKET}.s3.amazonaws.com/${url}`;
}

/**
 * Url stored in graphql database contains only the path. Prepend the prod
 * S3 path. Need to store full path for external references to the file
 * @param {string} url url stored in graphql db
 */
export function getUrlToProdS3( url ) {
  return `https://${process.env.AWS_S3_PRODUCTION_BUCKET}.s3.amazonaws.com/${url}`;
}
