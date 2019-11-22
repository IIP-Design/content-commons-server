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

  Mutation: {
    async createBureau( parent, args, ctx ) {
      const { data } = args;
      const bureau = await ctx.prisma.createBureau( {
        ...data
      } );
      return bureau;
    },

    updateBureau( parent, args, ctx ) {
      return ctx.prisma.updateBureau( { ...args } );
    },

    async createOffice( parent, args, ctx ) {
      const { data } = args;
      const office = await ctx.prisma.createOffice( {
        ...data
      } );
      return office;
    },

    updateOffice( parent, args, ctx ) {
      return ctx.prisma.updateOffice( { ...args } );
    }
  },

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
