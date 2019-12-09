import { ApolloError, UserInputError } from 'apollo-server-express';
// import pubsub from '../services/pubsub';
import { deleteAllS3Assets } from '../services/aws/s3';
// import transformPackage from '../services/es/package/transform';
// import { publishCreate, publishUpdate, publishDelete } from '../services/rabbitmq/package';
import { PACKAGE_DOCUMENT_FILES } from '../fragments/package';

const PUBLISHER_BUCKET = process.env.AWS_S3_AUTHORING_BUCKET;

export default {
  Subscription: {},

  Query: {
    packages( parent, args, ctx ) {
      return ctx.prisma.packages();
    },

    package( parent, args, ctx ) {
      return ctx.prisma.package( { id: args.id } );
    }
  },

  Mutation: {
    async packageExists( parent, args, ctx ) {
      const { where } = args;
      return ctx.prisma.$exists.package( where );
    },

    async createPackage( parent, args, ctx ) {
      const { data } = args;
      try {
        return ctx.prisma.createPackage( { ...data } );
      } catch ( err ) {
        throw new ApolloError( err );
      }
    },

    updatePackage( parent, args, ctx ) {
      const updates = { ...args };
      const {
        data,
        where: { id }
      } = updates;

      return ctx.prisma.updatePackage( {
        data,
        where: { id }
      } );
    },

    publishPackage( parent, { id }, ctx ) {
      return ctx.prisma.package( { id } );
    },

    unpublishPackage( parent, { id }, ctx ) {
      return ctx.prisma.package( { id } );
    },

    updateManyPackages( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyPackages( { data, where } );
    },

    async deletePackage( parent, { id }, ctx ) {
      // 1. Verify we have a valid package before continuing
      const doesPackageExist = await ctx.prisma.$exists.package( { id } );
      if ( !doesPackageExist ) {
        throw new UserInputError( 'A package with that id does not exist in the database', {
          invalidArgs: 'id'
        } );
      }

      // 2. Fetch files that need to be removed from s3
      const documents = await ctx.prisma.package( { id } ).$fragment( PACKAGE_DOCUMENT_FILES );

      // 3. Delete files if they exist
      if ( documents.length ) {
        let deleteS3;
        // const s3DirToDelete = getS3ContentDirectory( documents, 'package' );
        // setting this to null until the assetPath is implemented during pacakge creation
        const s3DirToDelete = null;

        // Delete files from S3
        if ( s3DirToDelete ) {
          deleteS3 = deleteAllS3Assets( s3DirToDelete, PUBLISHER_BUCKET ).catch( err => console.dir( err ) );
        }

        if ( deleteS3 ) {
          await deleteS3;
        }
      }

      // 4. Delete package from db and return id of deleted package
      return ctx.prisma.deletePackage( { id } );
    },

    deleteManyPackages( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyPackages( { ...where } );
    }
  },

  Package: {
    author( parent, args, ctx ) {
      return ctx.prisma.package( { id: parent.id } ).author( { ...args } );
    },

    team( parent, args, ctx ) {
      return ctx.prisma.package( { id: parent.id } ).team( { ...args } );
    },

    categories( parent, args, ctx ) {
      return ctx.prisma.package( { id: parent.id } ).categories( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma.package( { id: parent.id } ).tags( { ...args } );
    },

    documents( parent, args, ctx ) {
      return ctx.prisma.package( { id: parent.id } ).documents( { ...args } );
    }
  }
};
