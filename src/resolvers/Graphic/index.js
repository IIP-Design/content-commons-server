import { requiresLogin } from '../../lib/authentication';
import { getAssetPath } from '../../services/aws/s3';
import { ApolloError } from 'apollo-server-express';
import { GRAPHIC_ASSET_PATH } from '../../fragments/graphic';

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
    }
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
        where: { id }
      } = updates;

      return ctx.prisma.updateGraphicProject( {
        data,
        where: { id }
      } );
    },

    updateManyGraphicProjects( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;

      return ctx.prisma.updateManyGraphicProjects( { data, where } );
    },

    deleteGraphicProject( parent, { id }, ctx ) {
      return ctx.prisma.deleteGraphicProject( { id } );
    },

    deleteManyGraphicProjects( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyGraphicProjects( { ...where } );
    },

    async createGraphicStyle( parent, args, ctx ) {
      const { data } = args;
      const graphicStyle = await ctx.prisma.createGraphicStyle( {
        ...data
      } );

      return graphicStyle;
    },

    updateGraphicStyle( parent, args, ctx ) {
      const updates = { ...args };
      const {
        data,
        where: { id }
      } = updates;

      return ctx.prisma.updateGraphicStyle( {
        data,
        where: { id }
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
        ...data
      } );

      return socialPlatform;
    },

    updateSocialPlatform( parent, args, ctx ) {
      const updates = { ...args };
      const {
        data,
        where: { id }
      } = updates;

      return ctx.prisma.updateSocialPlatform( {
        data,
        where: { id }
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
    }
  } ),

  GraphicProject: {
    author( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: parent.id } ).author( { ...args } );
    },

    team( parent, args, ctx ) {
      return ctx.prisma.graphicProject( { id: parent.id } ).team( { ...args } );
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
    }
  }
};

export default GraphicResolvers;
