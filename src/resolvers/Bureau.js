export default {
  Query: {
    bureaus ( parent, args, ctx ) {
      return ctx.prisma.bureaus( { ...args } );
    },

    bureau ( parent, args, ctx ) {
      return ctx.prisma.bureau( { id: args.id } );
    },

    offices ( parent, args, ctx ) {
      return ctx.prisma.offices( { ...args } );
    },

    office ( parent, args, ctx ) {
      return ctx.prisma.office( { id: args.id } );
    }
  },

  Mutation: {},

  Bureau: {
    offices( parent, args, ctx ) {
      return ctx.prisma
        .bureau( { id: parent.id } )
        .offices( { ...args } );
    }
  },

  Office: {
    bureau( parent, args, ctx ) {
      return ctx.prisma
        .office( { id: parent.id } )
        .bureau( { ...args } );
    }
  }
};
