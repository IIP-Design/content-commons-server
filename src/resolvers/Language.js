export default {
  Query: {
    languages ( parent, args, ctx ) {
      return ctx.prisma.languages( { ...args } );
    },

    language( parent, args, ctx ) {
      return ctx.prisma.language( { id: args.id } );
    }
  },

  Mutation: {
    async createLanguage ( parent, args, ctx ) {
      const { data } = args;
      const language = await ctx.prisma.createLanguage( {
        ...data
      } );

      return language;
    },

    updateLanguage ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateLanguage( {
        data,
        where: { id }
      } );
    }
  }
};
