import { ApolloError, UserInputError } from 'apollo-server-express';

import { requiresLogin } from '../../lib/authentication';
import { getAssetPath } from '../../services/aws/s3';

const PlaybookResolvers = {

  Query: requiresLogin( {
    playbooks( parent, args, ctx ) {
      return ctx.prisma.playbooks( { ...args } );
    },

    playbook( parent, args, ctx ) {
      return ctx.prisma.playbook( { id: args.id } );
    },
  } ),

  Mutation: requiresLogin( {
    async createPlaybook( parent, args, ctx ) {
      const { data } = args;

      try {
        const { id, type } = await ctx.prisma.createPlaybook( { ...data } );

        // Set the S3 assetPath using the new package id
        const assetPath = getAssetPath( id, type.toLowerCase() );

        return ctx.prisma.updatePlaybook( {
          data: { assetPath },
          where: { id },
        } );
      } catch ( err ) {
        throw new ApolloError( err );
      }
    },

    updatePlaybook( parent, args, ctx ) {
      const updates = { ...args };
      const {
        data,
        where: { id },
      } = updates;

      return ctx.prisma.updatePlaybook( {
        data,
        where: { id },
      } );
    },
  } ),

  Playbook: {
    author( parent, args, ctx ) {
      return ctx.prisma.playbook( { id: parent.id } ).author( { ...args } );
    },

    team( parent, args, ctx ) {
      return ctx.prisma.playbook( { id: parent.id } ).team( { ...args } );
    },

    categories( parent, args, ctx ) {
      return ctx.prisma.playbook( { id: parent.id } ).categories( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma.playbook( { id: parent.id } ).tags( { ...args } );
    },

    content( parent, args, ctx ) {
      return ctx.prisma.playbook( { id: parent.id } ).content( { ...args } );
    },

    supportFiles( parent, args, ctx ) {
      return ctx.prisma.playbook( { id: parent.id } ).supportFiles( { ...args } );
    },
  },

};


export default PlaybookResolvers;
