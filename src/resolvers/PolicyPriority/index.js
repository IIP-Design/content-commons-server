import { requiresLogin } from '../../lib/authentication';

const PolicyPriorityResolvers = {
  Query: requiresLogin( {
    policyPriorities( parent, args, ctx ) {
      return ctx.prisma.policyPriorities( { ...args } );
    },

    policyPriority( parent, args, ctx ) {
      return ctx.prisma.policyPriority( { ...args } );
    },
  } ),

  Mutation: requiresLogin( {
    async createPolicyPriority( parent, args, ctx ) {
      const { data } = args;
      const policyPriority = await ctx.prisma.createPolicyPriority( { ...data } );

      return policyPriority;
    },

    updatePolicyPriority( parent, args, ctx ) {
      return ctx.prisma.updatePolicyPriority( { ...args } );
    },

    deletePolicyPriority( parent, { where }, ctx ) {
      const { id, name } = where;

      return ctx.prisma.deletePolicyPriority( { id, name } );
    },
  } ),
};

export default PolicyPriorityResolvers;
