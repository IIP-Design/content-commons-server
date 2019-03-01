export default {
  Query: {
    languages ( parent, args, ctx ) {
      return ctx.prisma.languages();
    },

    language( parent, args, ctx ) {
      return ctx.prisma.language( { id: args.id } );
    }
  },

  Mutation: {
    async createLanguage ( parent, args, ctx ) {
      const language = await ctx.prisma.createLanguage( {
        ...args
      } );

      return language;
    }
  }
};
