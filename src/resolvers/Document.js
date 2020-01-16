import { getSignedUrlPromiseGet } from '../services/aws/s3';

export default {
  Query: {
    documentFiles( parent, args, ctx ) {
      return ctx.prisma.documentFiles( { ...args } );
    },

    documentFile( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: args.id } );
    },

    documentUses ( parent, args, ctx ) {
      return ctx.prisma.documentUses( { ...args } );
    },

    documentUse( parent, args, ctx ) {
      return ctx.prisma.documentUse( { id: args.id } );
    },

    documentConversionFormats ( parent, args, ctx ) {
      return ctx.prisma.documentConversionFormats( { ...args } );
    },

    documentConversionFormat ( parent, args, ctx ) {
      return ctx.prisma.documentConversionFormat( { id: args.id } );
    }
  },

  Mutation: {
    async createDocumentFile( parent, args, ctx ) {
      const { data } = args;
      const documentFile = await ctx.prisma.createDocumentFile( { ...data } );

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

    deleteDocumentFile( parent, { id }, ctx ) {
      return ctx.prisma.deleteDocumentFile( { id } );
    },

    deleteManyDocumentFiles( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyDocumentFiles( { ...where } );
    },

    async createDocumentUse( parent, args, ctx ) {
      const documentUse = await ctx.prisma.createDocumentUse( {
        ...args
      } );

      return documentUse;
    },

    updateDocumentUse( parent, args, ctx ) {
      const updates = { ...args };
      const {
        data,
        where: { id }
      } = updates;
      return ctx.prisma.updateDocumentUse( {
        data,
        where: { id }
      } );
    },

    updateManyDocumentUses( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyDocumentUses( { data, where } );
    },

    deleteDocumentUse( parent, { id }, ctx ) {
      return ctx.prisma.deleteDocumentUse( { id } );
    },

    deleteManyDocumentUses( parent, { where }, ctx ) {
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
    }
  },

  DocumentFile: {
    async signedUrl( parent ) {
      const signed = await getSignedUrlPromiseGet( {
        key: parent.url,
        expires: 3600 // hour
      } );
      return signed.url;
    },

    language( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).language( { ...args } );
    },

    use( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).use( { ...args } );
    },

    image( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).image( { ...args } );
    },

    bureaus( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).bureaus( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).tags( { ...args } );
    },

    categories( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).categories( { ...args } );
    },

    content( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).content( { ...args } );
    }
  }
};
