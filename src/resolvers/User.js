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

  Mutation: {},

  User: {
    team( parent, args, ctx ) {
      return ctx.prisma
        .user( { id: parent.id } )
        .team( { ...args } );
    }
  }
};
