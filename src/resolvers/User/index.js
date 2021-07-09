import { requiresLogin } from '../../lib/authentication';

const UserResolvers = {
  Query: {
    authenticatedUser: ( parent, args, ctx ) => ctx.user,

    users: requiresLogin( ( parent, args, ctx ) => ctx.prisma.users() ),

    permissionEnum: requiresLogin( ( parent, args, ctx ) => {
      const query = `
       query {
          __type(name: "Permission") {
            enumValues {
              name
            }
          }
        }
      `;

      return ctx.prisma.$graphql( query );
    } ),
  },

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
