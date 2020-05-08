const RegionResolvers = {
  Query: {
    regions( parent, args, ctx ) {
      return ctx.prisma.regions( { ...args } );
    },

    region( parent, args, ctx ) {
      return ctx.prisma.region( { ...args } );
    },

    countries( parent, args, ctx ) {
      return ctx.prisma.countries( { ...args } );
    },

    country( parent, args, ctx ) {
      return ctx.prisma.country( { ...args } );
    }
  },

  Mutation: {
    async createRegion( parent, args, ctx ) {
      const { data } = args;
      const region = await ctx.prisma.createRegion( { ...data } );

      return region;
    }
  },

  Region: {
    countries( parent, args, ctx ) {
      return ctx.prisma.region( { id: parent.id } ).countries( { ...args } );
    }
  },

  Country: {
    region( parent, args, ctx ) {
      return ctx.prisma.country( { id: parent.id } ).region( { ...args } );
    }
  }
};

export default RegionResolvers;
