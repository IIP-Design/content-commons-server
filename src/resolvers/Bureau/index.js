import { requiresLogin } from '../../lib/authentication';

const BureauResolvers = {
  Query: requiresLogin( {
    bureaus( parent, args, ctx ) {
      return ctx.prisma.bureaus( { ...args } );
    },

    bureau( parent, args, ctx ) {
      return ctx.prisma.bureau( { ...args } );
    },
  } ),

  Mutation: requiresLogin( {
    async createBureau( parent, args, ctx ) {
      const { data } = args;
      const bureau = await ctx.prisma.createBureau( { ...data } );

      return bureau;
    },
  } ),

  Bureau: {
    offices( parent, args, ctx ) {
      return ctx.prisma.bureau( { id: parent.id } ).offices( { ...args } );
    },
  },
};

export default BureauResolvers;
