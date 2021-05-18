/**
 * Iterate through an array of content items, adding the provided value as a contentType property.
 *
 * @param {Object[]} arr List of content items.
 * @param {string} type The content type that we want to assign to each content item.
 * @returns {Object[]} The updated list of content items with the new contentType property.
 */
const appendContentType = ( arr, type ) => {
  arr.map( item => {
    item.contentType = type;

    return item;
  } );

  return arr;
};

/**
 * Get a single array of all the
 *
 * @param {string[]} contentTypes List of content types the given team supports.
 * @param {*} ctx
 * @param {string} teamId The unique identifier for the team whose content we are search for.
 * @returns
 */
export const getCombinedContent = async ( contentTypes, ctx, teamId ) => {
  // Initialize each content type with an empty array.
  let graphics = [];
  let packages = [];
  let videos = [];

  // Return all the team's content items for each of the supported content types.
  if ( contentTypes.includes( 'GRAPHIC' ) ) {
    graphics = await ctx.prisma.graphicProjects( {
      where: { team: { id: teamId } },
    } );
  }

  if ( contentTypes.includes( 'PACKAGE' ) ) {
    packages = await ctx.prisma.packages( {
      where: { team: { id: teamId } },
    } );
  }

  if ( contentTypes.includes( 'VIDEO' ) ) {
    videos = await ctx.prisma.videoProjects( {
      where: { team: { id: teamId } },
    } );
  }

  // Combine all the retrieved items into a single array.
  return [
    ...appendContentType( graphics, 'graphic' ),
    ...appendContentType( packages, 'package' ),
    ...appendContentType( videos, 'video' ),
  ];
};

/**
 * Iterate through an array of content items, selecting only those with the given contentType property value.
 *
 * @param {Object[]} arr List of content items.
 * @param {string} type The content type that we are seeking.
 * @returns {Object[]} The list of content items matching our search criteria.
 */
export const filterByContentType = ( arr, type ) => arr.filter( item => item.contentType === type );
