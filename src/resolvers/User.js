import { ApolloError } from 'apollo-server-express';

export default {
  Query: {
    authenticatedUser( parent, args, ctx ) {
      // Check for current user id
      if ( !ctx.req.userId ) {
        return null;
      }
      return ctx.prisma.user( { id: ctx.req.userId } );
    },

    users( parent, args, ctx ) {
      return ctx.prisma.users();
    }
  },

  Mutation: {
    async updateUser( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateUser( { data, where: { id } } );
    },

    deleteUser( parent, { id }, ctx ) {
      return ctx.prisma.deleteUser( { id } );
    }
  },

  User: {
    team( parent, args, ctx ) {
      return ctx.prisma.user( { id: parent.id } ).team( { ...args } );
    }
  }
};
