import { ApolloError, UserInputError } from 'apollo-server-express';
import { getS3ContentDirectory } from '../lib/sharedParser';
import { deleteAllS3Assets } from '../services/aws/s3';
import { PACKAGE_DOCUMENT_FILES, PACKAGE_FULL } from '../fragments/package';

const PUBLISHER_BUCKET = process.env.AWS_S3_AUTHORING_BUCKET;

// temp
const transformPackage = () => {};
const publishCreate = () => {};
const publishUpdate = () => {};
const publishDelete = () => {};

export default {
  Query: {
    packages ( parent, args, ctx ) {
      return ctx.prisma.packages( { ...args } );
    },

    package ( parent, args, ctx ) {
      return ctx.prisma.package( { id: args.id } );
    },
  },

  Mutation: {
    async createPackage ( parent, args, ctx ) {
      const { data } = args;
      const pkg = await ctx.prisma.createPackage( {
        ...data
      } );

      return pkg;
    },

    updatePackage ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;

      return ctx.prisma.updatePackage( {
        data,
        where: { id }
      } );
    },

    updateManyPackages ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyPackages( { data, where } );
    },

    async publishPackage( parent, args, ctx ) {
      // 1. Get data for project to publish from db
      const pkg = await ctx.prisma.package( { id: args.id } ).$fragment( PACKAGE_FULL );
      if ( !pkg ) {
        throw new UserInputError( 'A package with that id does not exist in the database', {
          invalidArgs: 'id'
        } );
      }

      // 2. Transform it into the acceptable elasticsearch data structure
      const esData = transformPackage( pkg );

      const { status } = pkg;

      // 3. Put on the queue for processing ( not sure we need to await here )
      if ( status === 'DRAFT' ) {
        publishCreate( args.id, esData, status );
      } else {
        publishUpdate( args.id, esData, status );
      }

      // 4. Update the project status
      await ctx.prisma.updatePackage( {
        data: { status: 'PUBLISHING' },
        where: args
      } ).catch( err => {
        throw new ApolloError( err );
      } );

      return pkg;
    },

    async unpublishPackage( parent, args, ctx ) {
      const pkg = await ctx.prisma.package( args ).$fragment( PACKAGE_FULL );
      if ( !pkg ) {
        throw new UserInputError( 'A package with that id does not exist in the database', {
          invalidArgs: 'id'
        } );
      }
      const { id } = pkg;

      publishDelete( id );

      return pkg;
    },

    async deletePackage( parent, { id }, ctx ) {
      // 1. Verify we have a valid project before continuing
      const doesPackageExist = await ctx.prisma.$exists.package( { id } );
      if ( !doesPackageExist ) {
        throw new UserInputError( 'A package with that id does not exist in the database', {
          invalidArgs: 'id'
        } );
      }

      // 2. Fetch files that need to be removed from s3
      const documents = await ctx.prisma.package( { id } ).documents().$fragment( PACKAGE_DOCUMENT_FILES );

      // 3. Delete files if they exist
      if ( documents.length ) {
        let deleteS3;
        const s3DirToDelete = getS3ContentDirectory( documents, 'package' );

        // Delete files from S3
        if ( s3DirToDelete ) {
          deleteS3 = deleteAllS3Assets( s3DirToDelete, PUBLISHER_BUCKET ).catch( err => console.dir( err ) );
        }

        if ( deleteS3 ) {
          await deleteS3;
        }
      }

      // 4. Delete project from db and return id of deleted project
      return ctx.prisma.deletePackage( { id } );
    },

    deleteManyPackages( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyPackages( { ...where } );
    },
  },

  Package: {
    author( parent, args, ctx ) {
      return ctx.prisma
        .package( { id: parent.id } )
        .author( { ...args } );
    },

    team( parent, args, ctx ) {
      return ctx.prisma
        .package( { id: parent.id } )
        .team( { ...args } );
    },

    categories( parent, args, ctx ) {
      return ctx.prisma
        .package( { id: parent.id } )
        .categories( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma
        .package( { id: parent.id } )
        .tags( { ...args } );
    },

    documents( parent, args, ctx ) {
      return ctx.prisma
        .package( { id: parent.id } )
        .documents( { ...args } );
    }
  }
};
