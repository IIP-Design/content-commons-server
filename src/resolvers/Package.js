export default {
  Query: {
    packages ( parent, args, ctx ) {
      return ctx.prisma.packages( { ...args } );
    },

    package ( parent, args, ctx ) {
      return ctx.prisma.package( { id: args.id } );
    },
  },

  Package: {
    categories( parent, args, ctx ) {
      return ctx.prisma
        .package( { id: parent.id } )
        .categories( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma
        .package( { id: parent.id } )
        .tags( { ...args } );
    },

    documents( parent, args, ctx ) {
      return ctx.prisma
        .package( { id: parent.id } )
        .documents( { ...args } );
    }
  }
};
