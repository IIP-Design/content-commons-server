import { requiresLogin } from '../../lib/authentication';

const LanguageResolvers = {
  Query: requiresLogin( {
    languages( parent, args, ctx ) {
      return ctx.prisma.languages( { ...args } );
    },

    language( parent, args, ctx ) {
      return ctx.prisma.language( { ...args } );
    },

    languageTranslations( parent, args, ctx ) {
      return ctx.prisma.languageTranslations( { ...args } );
    },

    languageTranslation( parent, args, ctx ) {
      return ctx.prisma.languageTranslation( { ...args } );
    },
  } ),

  Mutation: requiresLogin( {
    async createLanguage( parent, args, ctx ) {
      const { data } = args;
      const language = await ctx.prisma.createLanguage( {
        ...data,
      } );

      return language;
    },

    updateLanguage( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;

      return ctx.prisma.updateLanguage( {
        data,
        where: { id },
      } );
    },
  } ),

  LanguageTranslation: {
    language( parent, args, ctx ) {
      return ctx.prisma.languageTranslation( { id: parent.id } ).language();
    },
  },
};

export default LanguageResolvers;
