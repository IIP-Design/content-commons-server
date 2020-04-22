import { requiresLogin } from '../lib/authentication';

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
      const graphicProject = await ctx.prisma.createGraphicProject( {
        ...data
      } );

      return graphicProject;
    },

    updateGraphicProject( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;

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
      const { data, where: { id } } = updates;

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
      return ctx.prisma.deleteGraphicProject( { id } );
    },

    deleteManyGraphicStyles( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyGraphicProjects( { ...where } );
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
      const { data, where: { id } } = updates;

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
      return ctx.prisma.deleteGrSocialPlatform( { id } );
    },

    deleteManySocialPlatforms( parent, { where }, ctx ) {
      return ctx.prisma.deleteManySocialPlatforms( { ...where } );
    }
  } ),

  GraphicProject: {
    author( parent, args, ctx ) {
      return ctx.prisma
        .graphicProject( { id: parent.id } )
        .author( { ...args } );
    },

    team( parent, args, ctx ) {
      return ctx.prisma
        .graphicProject( { id: parent.id } )
        .team( { ...args } );
    },

    images( parent, args, ctx ) {
      return ctx.prisma
        .graphicProject( { id: parent.id } )
        .images( { ...args } );
    },

    supportFiles( parent, args, ctx ) {
      return ctx.prisma
        .graphicProject( { id: parent.id } )
        .supportFiles( { ...args } );
    },

    categories( parent, args, ctx ) {
      return ctx.prisma
        .graphicProject( { id: parent.id } )
        .categories( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma
        .graphicProject( { id: parent.id } )
        .tags( { ...args } );
    }
  }
};

export default GraphicResolvers;
