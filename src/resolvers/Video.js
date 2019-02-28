export default {
  Query: {
    videoProject ( parent, args, ctx ) {
      return ctx.prisma.videoProject( { id: args.id } );
    }
    },

    videoUnits ( parent, args, ctx ) {
      return ctx.prisma.videoUnits();
    }

      return video;
    },

  Mutation: {}
};
