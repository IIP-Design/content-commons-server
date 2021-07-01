import { requiresLogin } from '../../lib/authentication';
import { getAssetPath, deleteAllS3Assets } from '../../services/aws/s3';
import { ApolloError, UserInputError } from 'apollo-server-express';
import transformGraphic from '../../services/es/graphic/transform';
import { GRAPHIC_ASSET_PATH, GRAPHIC_PROJECT_FULL } from '../../fragments/graphic';
import { publishCreate, publishUpdate, publishDelete } from '../../services/rabbitmq/graphic';


const PUBLISHER_BUCKET = process.env.AWS_S3_AUTHORING_BUCKET;


const GraphicResolvers = {
  Query: requiresLogin( {
    graphicProjects( parent, args, ctx ) {
      return ctx.prisma.graphicProjects( { ...args } );
    },

    graphicProject( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: args.id } );
    },

    graphicStyles( parent, args, ctx ) {
      return ctx.prisma.graphicStyles( { ...args } );
    },

    graphicStyle( parent, args, ctx ) {
      return ctx.prisma.graphicStyle( { id: args.id } );
    },

    socialPlatforms( parent, args, ctx ) {
      return ctx.prisma.socialPlatforms( { ...args } );
    },

    socialPlatform( parent, args, ctx ) {
      return ctx.prisma.socialPlatform( { id: args.id } );
    },

    copyrightEnum( parent, args, ctx ) {
      const query = `
        query {
          __type(name: "Copyright") {
            enumValues {
              name
            }
          }
        }
      `;

      return ctx.prisma.$graphql( query );
    },

    visibilityEnum( parent, args, ctx ) {
      const query = `
        query {
          __type(name: "Visibility") {
            enumValues {
              name
            }
          }
        }
      `;

      return ctx.prisma.$graphql( query );
    },
  } ),

  Mutation: requiresLogin( {
    async createGraphicProject( parent, args, ctx ) {
      const { data } = args;

      try {
        const { id, type } = await ctx.prisma.createGraphicProject( { ...data } );

        // Set the S3 assetPath using the returned package id
        const assetPath = getAssetPath( id, type.toLowerCase() );

        // Add assetPath to project
        const project = await ctx.prisma
          .updateGraphicProject( { data: { assetPath }, where: { id } } )
          .$fragment( GRAPHIC_ASSET_PATH );

        return project;
      } catch ( err ) {
        throw new ApolloError( err );
      }
    },

    updateGraphicProject( parent, args, ctx ) {
      const updates = { ...args };
      const {
        data,
        where: { id },
      } = updates;

      return ctx.prisma.updateGraphicProject( {
        data,
        where: { id },
      } );
    },

    updateManyGraphicProjects( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;

      return ctx.prisma.updateManyGraphicProjects( { data, where } );
    },

    async publishGraphicProject( parent, args, ctx ) {
      const { id } = args;

      // 1. Get data for project to publish from db
      const graphicProject = await ctx.prisma
        .graphicProject( { id } )
        .$fragment( GRAPHIC_PROJECT_FULL );

      if ( !graphicProject ) {
        return ctx.prisma
          .updateGraphicProject( { data: { status: 'PUBLISH_FAILURE' }, where: { id } } )
          .catch( err => console.error( err ) );
      }

      // 2. Transform it into the acceptable elasticsearch data structure
      const esData = transformGraphic( graphicProject );

      const { status, assetPath } = graphicProject;

      // 3. Put on the queue for processing
      if ( status === 'DRAFT' ) {
        publishCreate( id, esData, status, assetPath );
      } else {
        publishUpdate( id, esData, status, assetPath );
      }

      // 4. Update the project status
      await ctx.prisma
        .updateGraphicProject( { data: { status: 'PUBLISHING' }, where: args } )
        .catch( err => {
          throw new ApolloError( err );
        } );

      return graphicProject;
    },

    async unpublishGraphicProject( parent, args, ctx ) {
      const { id } = args;

      // 1. Fetch project to delete
      const graphicProject = await ctx.prisma.graphicProject( args ).$fragment( GRAPHIC_PROJECT_FULL );

      // 2. If unable to locate project, notify of failure
      if ( !graphicProject ) {
        return ctx.prisma
          .updateGraphicProject( { data: { status: 'UNPUBLISH_FAILURE' }, where: { id } } )
          .catch( err => console.error( err ) );
      }

      // 3. Put unpublish request on the queue
      publishDelete( id, graphicProject.assetPath );

      return graphicProject;
    },

    async deleteGraphicProject( parent, { id }, ctx ) {
      // 1. Verify we have a valid project before continuing
      const graphicProject = await ctx.prisma
        .graphicProject( { id } )
        .$fragment( GRAPHIC_PROJECT_FULL );

      // 2. Notify user if the requested project does not exist
      if ( !graphicProject ) {
        throw new UserInputError( 'A package with that id does not exist in the database', {
          invalidArgs: 'id',
        } );
      }

      // 3. Delete files if they exist
      if ( graphicProject.images.length || graphicProject.supportFiles.length ) {
        if ( graphicProject.assetPath ) {
          await deleteAllS3Assets( graphicProject.assetPath, PUBLISHER_BUCKET ).catch( err => console.log(
            `Error in [deleteAllS3Assets] for project ${graphicProject.title} - ${graphicProject.id}. ${err}`,
          ) );
        }
      }

      // 4. Return id of deleted project
      return ctx.prisma.deleteGraphicProject( { id } );
    },

    deleteManyGraphicProjects( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyGraphicProjects( { ...where } );
    },

    async createGraphicStyle( parent, args, ctx ) {
      const { data } = args;
      const graphicStyle = await ctx.prisma.createGraphicStyle( {
        ...data,
      } );

      return graphicStyle;
    },

    updateGraphicStyle( parent, args, ctx ) {
      const updates = { ...args };
      const {
        data,
        where: { id },
      } = updates;

      return ctx.prisma.updateGraphicStyle( {
        data,
        where: { id },
      } );
    },

    updateManyGraphicStyles( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;

      return ctx.prisma.updateManyGraphicStyles( { data, where } );
    },

    deleteGraphicStyle( parent, { id }, ctx ) {
      return ctx.prisma.deleteGraphicStyle( { id } );
    },

    deleteManyGraphicStyles( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyGraphicStyles( { ...where } );
    },

    async createSocialPlatform( parent, args, ctx ) {
      const { data } = args;
      const socialPlatform = await ctx.prisma.createSocialPlatform( {
        ...data,
      } );

      return socialPlatform;
    },

    updateSocialPlatform( parent, args, ctx ) {
      const updates = { ...args };
      const {
        data,
        where: { id },
      } = updates;

      return ctx.prisma.updateSocialPlatform( {
        data,
        where: { id },
      } );
    },

    updateManySocialPlatforms( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;

      return ctx.prisma.updateManySocialPlatforms( { data, where } );
    },

    deleteSocialPlatform( parent, { id }, ctx ) {
      return ctx.prisma.deleteSocialPlatform( { id } );
    },

    deleteManySocialPlatforms( parent, { where }, ctx ) {
      return ctx.prisma.deleteManySocialPlatforms( { ...where } );
    },
  } ),

  GraphicProject: {
    author( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: parent.id } ).author( { ...args } );
    },

    team( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: parent.id } ).team( { ...args } );
    },

    descPublic( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: parent.id } ).descPublic( { ...args } );
    },

    descInternal( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: parent.id } ).descInternal( { ...args } );
    },

    images( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: parent.id } ).images( { ...args } );
    },

    supportFiles( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: parent.id } ).supportFiles( { ...args } );
    },

    categories( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: parent.id } ).categories( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: parent.id } ).tags( { ...args } );
    },
  },
};

export default GraphicResolvers;
