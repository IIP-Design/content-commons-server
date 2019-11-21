export default {
  Query: {
    packages ( parent, args, ctx ) {
      return ctx.prisma.packages( { ...args } );
    },

    package ( parent, args, ctx ) {
      return ctx.prisma.package( { id: args.id } );
    },
  },

  Mutation: {
    async createPackage ( parent, args, ctx ) {
      const { data } = args;
      const pkg = await ctx.prisma.createPackage( {
        ...data
      } );

      return pkg;
    },

    updatePackage ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;

      return ctx.prisma.updatePackage( {
        data,
        where: { id }
      } );
    },

    updateManyPackages ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyPackages( { data, where } );
    },

    deletePackage ( parent, { id }, ctx ) {
      return ctx.prisma.deletePackage( { id } );
    },

    deleteManyPackages( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyPackages( { ...where } );
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
