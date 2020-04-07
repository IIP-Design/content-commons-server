import { ApolloError } from 'apollo-server-express';
import { requiresLogin } from '../lib/authentication';

export default {
  Query: {
    authenticatedUser( parent, args, ctx ) {
      console.log( `USER ${ctx.user}` );
      return ctx.user;
    },

    users( parent, args, ctx ) {
      return ctx.prisma.users();
    }
  },

  Mutation: requiresLogin( {
    async updateUser( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateUser( { data, where: { id } } );
    },

    deleteUser( parent, { id }, ctx ) {
      return ctx.prisma.deleteUser( { id } );
    }
  } ),

  User: {
    team( parent, args, ctx ) {
      return ctx.prisma.user( { id: parent.id } ).team( { ...args } );
    }
  }
};
