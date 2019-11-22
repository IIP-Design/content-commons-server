import { ApolloError, UserInputError } from 'apollo-server-express';

// temp
const VIDEO_PACKAGE_FULL = 'VIDEO_PACKAGE_FULL';
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
      const pkg = await ctx.prisma.package( { id: args.id } ).$fragment( VIDEO_PACKAGE_FULL );
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
      const pkg = await ctx.prisma.package( args ).$fragment( VIDEO_PACKAGE_FULL );
      if ( !pkg ) {
        throw new UserInputError( 'A package with that id does not exist in the database', {
          invalidArgs: 'id'
        } );
      }
      const { id } = pkg;

      publishDelete( id );

      return pkg;
    },

    deletePackage ( parent, { id }, ctx ) {
      return ctx.prisma.deletePackage( { id } );
    },

    deleteManyPackages( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyPackages( { ...where } );
    },
  },

  Package: {
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
