import { ApolloError, UserInputError } from 'apollo-server-express';

import { getAssetPath, deleteAllS3Assets } from '../../services/aws/s3';
import { requiresLogin } from '../../lib/authentication';

const PUBLISHER_BUCKET = process.env.AWS_S3_AUTHORING_BUCKET;

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

    async deletePlaybook( parent, { id }, ctx ) {
      // 1. Verify we have a valid project before continuing
      const playbook = await ctx.prisma
        .playbook( { id } );

      // 2. Notify user if the requested playbook does not exist
      if ( !playbook ) {
        throw new UserInputError( 'A playbook with that id does not exist in the database', {
          invalidArgs: 'id',
        } );
      }

      // 3. Delete files if they exist
      if ( playbook?.supportFiles?.length ) {
        if ( playbook.assetPath ) {
          await deleteAllS3Assets( playbook.assetPath, PUBLISHER_BUCKET ).catch( err => console.log(
            `Error in [deleteAllS3Assets] for project ${playbook.title} - ${playbook.id}. ${err}`,
          ) );
        }
      }

      // 4. Return id of deleted project
      return ctx.prisma.deletePlaybook( { id } );
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

    policy( parent, args, ctx ) {
      return ctx.prisma.playbook( { id: parent.id } ).policy( { ...args } );
    },

    supportFiles( parent, args, ctx ) {
      return ctx.prisma.playbook( { id: parent.id } ).supportFiles( { ...args } );
    },
  },

};


export default PlaybookResolvers;
