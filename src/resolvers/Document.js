export default {
  Query: {
    documentFiles ( parent, args, ctx ) {
      return ctx.prisma.documentFiles( { ...args } );
    },

    documentFile ( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: args.id } );
    },

    documentUses ( parent, args, ctx ) {
      return ctx.prisma.documentUses( { ...args } );
    },
    documentUse ( parent, args, ctx ) {
      return ctx.prisma.documentUse( { id: args.id } );
    },

    documentConversionFormats ( parent, args, ctx ) {
      return ctx.prisma.documentConversionFormats( { ...args } );
    },
    documentConversionFormat ( parent, args, ctx ) {
      return ctx.prisma.documentConversionFormat( { id: args.id } );
    },
  },

  Mutation: {

    async createDocumentUse ( parent, args, ctx ) {
      const documentUse = await ctx.prisma.createDocumentUse( {
        ...args
      } );

      return documentUse;
    },

    updateDocumentUse ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateDocumentUse( {
        data,
        where: { id }
      } );
    },

    updateManyDocumentUses ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyDocumentUses( { data, where } );
    },

    deleteDocumentUse ( parent, { id }, ctx ) {
      return ctx.prisma.deleteDocumentUse( { id } );
    },

    deleteManyDocumentUses ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyDocumentUses( { ...where } );
    },
  }
};
