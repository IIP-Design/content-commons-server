import { UserInputError } from 'apollo-server-express';
import { hasValidValue } from '../lib/projectParser';
import { deleteS3Asset, getSignedUrlPromiseGet } from '../services/aws/s3';

const PUBLISHER_BUCKET = process.env.AWS_S3_AUTHORING_BUCKET;

export default {
  Query: {
    documentFiles ( parent, args, ctx ) {
      return ctx.prisma.documentFiles( { ...args } );
    },

    documentFile ( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: args.id } );
    },

    documentUses ( parent, args, ctx ) {
      return ctx.prisma.documentUses( { ...args } );
    },
    documentUse ( parent, args, ctx ) {
      return ctx.prisma.documentUse( { id: args.id } );
    },

    documentConversionFormats ( parent, args, ctx ) {
      return ctx.prisma.documentConversionFormats( { ...args } );
    },
    documentConversionFormat ( parent, args, ctx ) {
      return ctx.prisma.documentConversionFormat( { id: args.id } );
    },
  },

  Mutation: {
    async createDocumentFile ( parent, args, ctx ) {
      const { data } = args;
      const documentFile = await ctx.prisma.createDocumentFile( {
        ...data
      } );

      return documentFile;
    },

    updateDocumentFile ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateDocumentFile( {
        data,
        where: { id }
      } );
    },

    updateManyDocumentFiles ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyDocumentFiles( { data, where } );
    },

    async deleteDocumentFile ( parent, { id }, ctx ) {
      // 1. Verify we have a document file before continuing
      const doesDocumentFileExist = await ctx.prisma.$exists.documentFile( { id } );
      if ( !doesDocumentFileExist ) {
        throw new UserInputError( `A document file with id: ${id} does not exist in the database`, {
          invalidArgs: 'id'
        } );
      }

      // 2. Fetch image file that needs to be removed from s3
      const documentFile = await ctx.prisma.documentFile( { id } );
      const { url } = documentFile;

      // 3. Delete from s3
      if ( hasValidValue( url ) ) {
        await deleteS3Asset( url, PUBLISHER_BUCKET );
      }

      // 4. Delete from DB
      return ctx.prisma.deleteDocumentFile( { id } );
    },

    deleteManyDocumentFiles ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyDocumentFiles( { ...where } );
    },

    async createDocumentUse ( parent, args, ctx ) {
      const documentUse = await ctx.prisma.createDocumentUse( {
        ...args
      } );

      return documentUse;
    },

    updateDocumentUse ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateDocumentUse( {
        data,
        where: { id }
      } );
    },

    updateManyDocumentUses ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyDocumentUses( { data, where } );
    },

    deleteDocumentUse ( parent, { id }, ctx ) {
      return ctx.prisma.deleteDocumentUse( { id } );
    },

    deleteManyDocumentUses ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyDocumentUses( { ...where } );
    },

    async createDocumentConversionFormat ( parent, args, ctx ) {
      const { data } = args;
      const documentConversionFormat = await ctx.prisma.createDocumentConversionFormat( {
        ...data
      } );

      return documentConversionFormat;
    },

    updateDocumentConversionFormat ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateDocumentConversionFormat( {
        data,
        where: { id }
      } );
    },

    updateManyDocumentConversionFormats ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyDocumentConversionFormats( { data, where } );
    },

    deleteDocumentConversionFormat ( parent, { id }, ctx ) {
      return ctx.prisma.deleteDocumentConversionFormat( { id } );
    },

    deleteManyDocumentConversionFormats ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyDocumentConversionFormats( { ...where } );
    },
  },

  DocumentFile: {
    author( parent, args, ctx ) {
      return ctx.prisma
        .documentFile( { id: parent.id } )
        .author( { ...args } );
    },

    team( parent, args, ctx ) {
      return ctx.prisma
        .documentFile( { id: parent.id } )
        .team( { ...args } );
    },

    language( parent, args, ctx ) {
      return ctx.prisma
        .documentFile( { id: parent.id } )
        .language( { ...args } );
    },

    content( parent, args, ctx ) {
      return ctx.prisma
        .documentFile( { id: parent.id } )
        .content( { ...args } );
    },

    image( parent, args, ctx ) {
      return ctx.prisma
        .documentFile( { id: parent.id } )
        .image( { ...args } );
    },

    async signedUrl( parent ) {
      const signed = await getSignedUrlPromiseGet( {
        key: parent.url,
        expires: 3600 // hour
      } );
      return signed.url;
    },

    use( parent, args, ctx ) {
      return ctx.prisma
        .documentFile( { id: parent.id } )
        .use( { ...args } );
    },

    bureaus( parent, args, ctx ) {
      return ctx.prisma
        .documentFile( { id: parent.id } )
        .bureaus( { ...args } );
    },

    categories( parent, args, ctx ) {
      return ctx.prisma
        .documentFile( { id: parent.id } )
        .categories( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma
        .documentFile( { id: parent.id } )
        .tags( { ...args } );
    }
  }
};
