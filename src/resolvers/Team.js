export default {
  Query: {
    teams ( parent, args, ctx ) {
      return ctx.prisma.teams();
    },

    team( parent, args, ctx ) {
      return ctx.prisma.team( { id: args.id } );
    }
  },

  Mutation: {
    async createTeam ( parent, args, ctx ) {
      const team = await ctx.prisma.createTeam( {
        ...args
      } );

      return team;
    }
  }
};
