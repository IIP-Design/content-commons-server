export default {
  Query: {
    videoProjects ( parent, args, ctx ) {
      return ctx.prisma.videoProjects();
    },

    videoProject ( parent, args, ctx ) {
      return ctx.prisma.videoProject( { id: args.id } );
    },

    videoUnits ( parent, args, ctx ) {
      return ctx.prisma.videoUnits();
    },

    videoUnit ( parent, args, ctx ) {
      return ctx.prisma.videoUnit( { id: args.id } );
    },

    supportFiles ( parent, args, ctx ) {
      return ctx.prisma.supportFiles();
    },

    supportFile ( parent, args, ctx ) {
      return ctx.prisma.supportFile( { id: args.id } );
    }
  },

  Mutation: {
    async createVideoProject ( parent, args, ctx ) {
      const video = await ctx.prisma.createVideoProject( {
        ...args
      } );

      return video;
    },

    updateVideoProject ( parent, args, ctx ) {
      const updates = { ...args };
      delete updates.id;
      return ctx.prisma.updateVideoProject( {
        data: updates,
        where: {
          id: args.id
        }
      } );
    },

    deleteVideoProject( parent, { id }, ctx ) {
      return ctx.prisma.deleteVideoProject( { id } );
    },

    async createVideoUnit ( parent, args, ctx ) {
      const video = await ctx.prisma.createVideoUnit( {
        ...args
      } );

      return video;
    },

    updateVideoUnit ( parent, args, ctx ) {
      const updates = { ...args };
      delete updates.id;
      return ctx.prisma.updateVideoUnit( {
        data: updates,
        where: {
          id: args.id
        }
      } );
    },

    deleteVideoUnit( parent, { id }, ctx ) {
      return ctx.prisma.deleteVideoUnit( { id } );
    }
  }
};
