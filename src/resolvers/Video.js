export default {
  Query: {
    videoProject ( parent, args, ctx ) {
      return ctx.prisma.videoProject( { id: args.id } );
    }
    },

    videoUnits ( parent, args, ctx ) {
      return ctx.prisma.videoUnits();
    },

    videoUnit ( parent, args, ctx ) {
      return ctx.prisma.videoUnit( { id: args.id } );
    }

      return video;
  },

  Mutation: {}
};
