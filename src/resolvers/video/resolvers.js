export default {
  Query: {
    videos ( parent, args, ctx ) {
      return ctx.prisma.videos();
    },

    video( parent, args, ctx ) {
      return ctx.prisma.video( { id: args.id } );
    }
  },

  Mutation: {
    async createVideo ( parent, args, ctx ) {
      const video = await ctx.prisma.createVideo( {
        ...args
      } );

      return video;
    },

    updateVideo ( parent, args, ctx ) {
      const updates = { ...args };
      delete updates.id;
      return ctx.prisma.updateVideo( {
        data: updates,
        where: {
          id: args.id
        }
      } );
    },

    deleteVideo( parent, { id }, ctx ) {
      return ctx.prisma.deleteVideo( { id } );
    }
  }
};
