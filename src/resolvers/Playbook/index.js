import { ApolloError, UserInputError } from 'apollo-server-express';

import { deleteAssets } from './controller';
import { getAssetPath, deleteAllS3Assets } from '../../services/aws/s3';
import { PLAYBOOK_FULL } from '../../fragments/playbook';
import { publishCreate, publishUpdate, publishDelete } from '../../services/rabbitmq/playbook';
import { requiresLogin } from '../../lib/authentication';
import transformPlaybook from '../../services/es/playbook/transform';

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

      const { supportFiles } = data;

      // Delete support files
      if ( supportFiles?.delete ) {
        const fileToDelete = supportFiles.delete;

        deleteAssets( ctx, fileToDelete ).catch( err => `Unable to delete assets ${err.toString()}` );
      }

      return ctx.prisma.updatePlaybook( {
        data,
        where: { id },
      } );
    },

    async deletePlaybook( parent, { id }, ctx ) {
      // 1. Verify we have a valid project before continuing
      const playbookExists = await ctx.prisma.$exists.playbook( { id } );

      // 2. Notify user if the requested playbook does not exist
      if ( !playbookExists ) {
        throw new UserInputError( 'A playbook with that id does not exist in the database', {
          invalidArgs: 'id',
        } );
      }

      // 3. If playbook does exist, retrieve it's information.
      const playbook = await ctx.prisma.playbook( { id } ).$fragment( PLAYBOOK_FULL );

      // 4. Delete files if they exist
      if ( playbook?.supportFiles?.length ) {
        let deleteS3;

        if ( playbook.assetPath ) {
          deleteS3 = deleteAllS3Assets( playbook.assetPath, PUBLISHER_BUCKET ).catch( err => console.log(
            `Error in [deleteAllS3Assets] for project ${playbook.title} - ${playbook.id}. ${err}`,
          ) );
        }

        if ( deleteS3 ) {
          await deleteS3;
        }
      }

      // 5. Return id of deleted project
      return ctx.prisma.deletePlaybook( { id } );
    },

    async publishPlaybook( parent, { id }, ctx ) {
      // 1. Get data for playbook to publish from db
      const playbook = await ctx.prisma.playbook( { id } ).$fragment( PLAYBOOK_FULL );

      if ( !playbook ) {
        throw new UserInputError( `Unable to publish playbook as a playbook does not exist with id: ${id}`, {
          invalidArgs: 'id',
        } );
      }

      // 2. Transform it into the acceptable elasticsearch data structure
      const esData = transformPlaybook( playbook );
      const { status, assetPath } = playbook;

      // 3. Put on the queue for processing
      if ( status === 'DRAFT' ) {
        publishCreate( id, esData, status, assetPath );
      } else {
        publishUpdate( id, esData, status, assetPath );
      }

      return playbook;
    },

    async unpublishPlaybook( parent, { id }, ctx ) {
      const playbook = await ctx.prisma.playbook( { id } ).$fragment( PLAYBOOK_FULL );

      if ( !playbook ) {
        return ctx.prisma
          .updatePlaybook( { data: { status: 'UNPUBLISH_FAILURE' }, where: { id } } )
          .catch( err => console.error( err ) );
      }

      publishDelete( id, playbook.assetPath );

      return playbook;
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
