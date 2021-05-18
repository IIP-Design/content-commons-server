import { requiresLogin } from '../../lib/authentication';
import { filterByContentType, getCombinedContent } from './utils';

const TeamResolvers = {
  Query: {
    teams( parent, args, ctx ) {
      return ctx.prisma.teams( { ...args } );
    },

    team( parent, args, ctx ) {
      return ctx.prisma.team( { id: args.id } );
    },

    async teamProjects( parent, args, ctx ) {
      const team = await ctx.prisma.team( { id: args.id } );

      const combined = await getCombinedContent( team.contentTypes, ctx, args.id );

      return {
        graphics: filterByContentType( combined, 'graphic' ),
        packages: filterByContentType( combined, 'package' ),
        videos: filterByContentType( combined, 'video' ),
      };
    },
  },

  Mutation: requiresLogin( {
    async createTeam( parent, args, ctx ) {
      const team = await ctx.prisma.createTeam( {
        ...args,
      } );

      return team;
    },

    updateTeam( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;

      return ctx.prisma.updateTeam( {
        data,
        where: { id },
      } );
    },

    deleteTeam( parent, { where }, ctx ) {
      const { name } = where;

      return ctx.prisma.deleteTeam( { name } );
    },
  } ),
};

export default TeamResolvers;
