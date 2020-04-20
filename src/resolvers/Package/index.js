import { ApolloError, UserInputError } from 'apollo-server-express';
import { requiresLogin } from '../../lib/authentication';
import { deleteAllS3Assets, getAssetPath } from '../../services/aws/s3';
import transformPackage from '../../services/es/package/transform';
import { publishCreate, publishUpdate, publishDelete } from '../../services/rabbitmq/package';
import { publishToChannel } from '../../services/rabbitmq';
import { PACKAGE_FULL } from '../../fragments/package';
import { deleteAssets } from './controller';

const PUBLISHER_BUCKET = process.env.AWS_S3_AUTHORING_BUCKET;

const PackageResolvers = {
  Query: requiresLogin( {
    packages( parent, args, ctx ) {
      const pagination = {};

      if ( args.first ) pagination.first = args.first;
      if ( args.orderBy ) pagination.orderBy = args.orderBy;
      if ( args.skip ) pagination.skip = args.skip;

      return ctx.prisma.packages( pagination );
    },

    package( parent, args, ctx ) {
      return ctx.prisma.package( { id: args.id } );
    }
  } ),

  Mutation: requiresLogin( {
    async packageExists( parent, args, ctx ) {
      const { where } = args;

      return ctx.prisma.$exists.package( where );
    },

    async createPackage( parent, args, ctx ) {
      const { data } = args;

      try {
        const { id, type } = await ctx.prisma.createPackage( { ...data } );

        // Set the S3 assetPath using the new package id
        const assetPath = getAssetPath( id, type.toLowerCase() );

        return ctx.prisma.updatePackage( {
          data: { assetPath },
          where: { id }
        } );
      } catch ( err ) {
        throw new ApolloError( err );
      }
    },

    async updatePackage( parent, args, ctx ) {
      const updates = { ...args };

      const {
        data,
        where: { id }
      } = updates;


      const { documents } = data;

      // 1. Delete documents
      if ( documents && documents.delete ) {
        const documentsToDelete = documents.delete;

        deleteAssets( ctx, documentsToDelete ).catch( err => `Unable to delete assets ${err.toString()}` );
      }

      // 2. Update package to add any new documents, we need the new document
      // ids to pass to the document convert worker
      const pkg = await ctx.prisma
        .updatePackage( { data, where: { id } } )
        .$fragment( PACKAGE_FULL );

      // 3. If new docs, put on document util worker queue
      // for processing
      if ( documents && documents.create && documents.create[0] ) {
        if ( pkg && pkg.documents ) {
          pkg.documents.forEach( document => {
            if ( !document.content ) {
              console.log( `[x] PUBLISHING a util process request for : document ${document.title}` );

              publishToChannel( {
                routingKey: 'convert.document',
                exchangeName: 'util',
                data: {
                  id: document.id,
                  url: document.url,
                  assetPath: data.assetPath,
                  thumbnailFilename: document.title
                }
              } );
            }
          } );
        }
      }

      return pkg;
    },

    async publishPackage( parent, { id }, ctx ) {
      // 1. Get data for project to publish from db
      const pkg = await ctx.prisma.package( { id } ).$fragment( PACKAGE_FULL );

      if ( !pkg ) {
        return ctx.prisma
          .updatePackage( { data: { status: 'PUBLISH_FAILURE' }, where: { id } } )
          .catch( err => console.error( err ) );
      }

      // 2. Transform it into the acceptable elasticsearch data structure
      const esData = transformPackage( pkg );
      const { status } = pkg;

      // 3. Put on the queue for processing ( not sure we need to await here )
      if ( status === 'DRAFT' ) {
        publishCreate( id, esData, status, pkg.assetPath );
      } else {
        publishUpdate( id, esData, status, pkg.assetPath );
      }

      return pkg;
    },

    async unpublishPackage( parent, { id }, ctx ) {
      const pkg = await ctx.prisma.package( { id } ).$fragment( PACKAGE_FULL );

      if ( !pkg ) {
        return ctx.prisma
          .updatePackage( { data: { status: 'UNPUBLISH_FAILURE' }, where: { id } } )
          .catch( err => console.error( err ) );
      }

      // Need to delete the package id AND its containing documents
      const ids = { id, documentIds: pkg.documents.map( document => document.id ) };

      publishDelete( ids, pkg.assetPath );

      return pkg;
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
      const pkg = await ctx.prisma.package( { id } ).$fragment( PACKAGE_FULL );

      // 3. Delete files if they exist
      if ( pkg && pkg.documents.length ) {
        let deleteS3;

        // Delete files from S3
        if ( pkg.assetPath ) {
          deleteS3 = deleteAllS3Assets( pkg.assetPath, PUBLISHER_BUCKET ).catch( err => console.dir( err ) );
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
  } ),

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

export default PackageResolvers;
