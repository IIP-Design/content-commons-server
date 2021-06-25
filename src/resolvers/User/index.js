import { requiresLogin } from '../../lib/authentication';

const UserResolvers = {
  Query: requiresLogin( {
    authenticatedUser( parent, args, ctx ) {
      return ctx.user;
    },

    users( parent, args, ctx ) {
      return ctx.prisma.users();
    },
  } ),

  Mutation: requiresLogin( {
    async updateUser( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;

      return ctx.prisma.updateUser( { data, where: { id } } );
    },

    deleteUser( parent, { id }, ctx ) {
      return ctx.prisma.deleteUser( { id } );
    },
  } ),

  User: {
    team( parent, args, ctx ) {
      return ctx.prisma.user( { id: parent.id } ).team( { ...args } );
    },
  },
};

export default UserResolvers;
