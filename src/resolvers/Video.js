export default {
  Query: {
    videoProject ( parent, args, ctx ) {
      return ctx.prisma.videoProject( { id: args.id } );
    }
  },

  Mutation: {
    async createVideo ( parent, args, ctx ) {
      const video = await ctx.prisma.createVideo( {
        ...args
      } );

      return video;
    },

  Mutation: {}
};
