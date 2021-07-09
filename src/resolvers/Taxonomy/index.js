import { requiresLogin } from '../../lib/authentication';

const TaxonomyResolvers = {
  Query: requiresLogin( {
    categories( parent, args, ctx ) {
      return ctx.prisma.categories( { ...args } );
    },

    category( parent, args, ctx ) {
      return ctx.prisma.category( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma.tags( { ...args } );
    },

    tag( parent, args, ctx ) {
      return ctx.prisma.tag( { ...args } );
    },
  } ),

  Mutation: requiresLogin( {
    async createCategory( parent, args, ctx ) {
      const { data } = args;
      const category = await ctx.prisma.createCategory( {
        ...data,
      } );

      return category;
    },

    updateCategory( parent, args, ctx ) {
      return ctx.prisma.updateCategory( { ...args } );
    },

    async createTag( parent, args, ctx ) {
      const { data } = args;
      const tag = await ctx.prisma.createTag( {
        ...data,
      } );

      return tag;
    },

    updateTag( parent, args, ctx ) {
      return ctx.prisma.updateTag( { ...args } );
    },
  } ),

  Category: {
    translations( parent, args, ctx ) {
      return ctx.prisma.category( { id: parent.id } ).translations( { ...args } );
    },
  },

  Tag: {
    translations( parent, args, ctx ) {
      return ctx.prisma.tag( { id: parent.id } ).translations( { ...args } );
    },
  },
};

export default TaxonomyResolvers;
