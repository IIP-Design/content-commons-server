import { ApolloError, UserInputError } from 'apollo-server-express';
import axios from 'axios';
import mammoth from 'mammoth';
import toArray from 'stream-to-array';
import xss from 'xss';
// import pubsub from '../services/pubsub';
import {
  deleteAllS3Assets, deleteS3Asset, getAssetPath, getSignedUrlPromiseGet
} from '../services/aws/s3';
// import transformPackage from '../services/es/package/transform';
// import { publishCreate, publishUpdate, publishDelete } from '../services/rabbitmq/package';
import { hasValidValue } from '../lib/projectParser';
import { PACKAGE_FULL } from '../fragments/package';

const PUBLISHER_BUCKET = process.env.AWS_S3_AUTHORING_BUCKET;

/**
 * Strips tags and multiple spaces from a string of html
 * @param {string} string
 */
const htmlToText = ( string = '' ) => (
  string
    .replace( /<[\s\S]*?>/g, ' ' )
    .replace( /\s{2,}/g, ' ' )
    .trim()
);

/**
 * Creates a Buffer from a stream part
 * @param {*} part
 */
const handleStreamPart = part => (
  Buffer.isBuffer( part )
    ? part
    : Buffer.from( part )
);

/**
 * Concatenates an array of Buffers
 * @param {array} streamParts
 */
const streamToBuffer = streamParts => {
  const buffers = streamParts.map( handleStreamPart );
  return Buffer.concat( buffers );
};

/**
 * Gets a remote docx as a Buffer
 * @param {string} url
 */
const getDocxBuffer = url => (
  axios.get( url, { responseType: 'stream' } )
    .then( async res => {
      if ( res.status === 200 ) {
        return toArray( res.data )
          .then( streamToBuffer )
          .then( buf => buf ) // buf, i.e., buffer
          .catch( err => console.log( err ) );
      }
      return [];
    } )
    .then( buf => buf )
    .catch( err => console.log( err ) )
);

/**
 * Builds document.content w/ converted docx content
 * @param {object} document
 * @param {object} input
 * @see https://github.com/mwilliamson/mammoth.js
 */
const setDocumentContent = async ( document, input ) => (
  mammoth.convertToHtml( input )
    .then( result => {
      if ( result.value ) {
        document.content = {
          create: {
            rawText: htmlToText( result.value ),
            html: xss( result.value ),
            // omitting md to simply & since it's not used by client
            markdown: ''
          }
        };
      }

      if ( result.messages && result.messages.length ) {
        result.messages.forEach( msg => console.log( msg ) );
      }
    } )
    .catch( err => console.log( err ) )
    .done()
);

/**
 * Converts docx
 * @param {string} id Package id
 * @param {object} data
 * @param {object} ctx Prisma context
 */
const convertDocxContent = async ( id, data, ctx ) => {
  if ( !data.documents || !data.documents.create || !data.documents.create[0] ) {
    return;
  }

  const document = data.documents.create[0];
  const signed = await getSignedUrlPromiseGet( { key: document.url } );
  const buffer = await getDocxBuffer( signed.url );

  await setDocumentContent( document, { buffer } )
    .then( () => (
      // call updatePackage to update data w/ document content
      ctx.prisma.updatePackage( {
        data: {}, // {} to avoid creating a document w/ no content
        where: { id }
      } )
    ) );
};

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

      if ( data && data.documents && data.documents.delete ) {
        const documentsToDelete = data.documents.delete;
        documentsToDelete.forEach( async document => {
          const { url } = await ctx.prisma.documentFile( { id: document.id } );
          if ( url && hasValidValue( url ) ) {
            await deleteS3Asset( url, PUBLISHER_BUCKET ).catch( err => console.dir( err ) );
          }
        } );
      }

      await convertDocxContent( id, data, ctx );

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
