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
      const { data } = args;
      const language = await ctx.prisma.createLanguage( {
        ...data
      } );

      return language;
    }
  }
};
