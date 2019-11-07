export default {
  Query: {
    documentUses ( parent, args, ctx ) {
      return ctx.prisma.documentUses( { ...args } );
    },
    documentUse ( parent, args, ctx ) {
      return ctx.prisma.documentUse( { id: args.id } );
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
