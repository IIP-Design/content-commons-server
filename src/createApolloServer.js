import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import merge from 'lodash/merge';
import path from 'path';
import jwt from 'jsonwebtoken';
import AuthResolvers from './resolvers/Auth';
// import SharedResolvers from './resolvers/Shared';
import LanguageResolvers from './resolvers/Language';
import RegionResolvers from './resolvers/Region';
import BureauResolvers from './resolvers/Bureau';
import TaxonomyResolvers from './resolvers/Taxonomy';
import TeamResolvers from './resolvers/Team';
import UserResolvers from './resolvers/User';
import UtilResolvers from './resolvers/Util';
import DocumentResolvers from './resolvers/Document';
import VideoResolvers from './resolvers/Video';
import PackageResolvers from './resolvers/Package';
import { prisma } from './schema/generated/prisma-client';


const typeDefs = importSchema( path.resolve( 'src/schema/index.graphql' ) );

const resolvers = merge(
  AuthResolvers,
  UtilResolvers,
  // SharedResolvers,
  LanguageResolvers,
  TaxonomyResolvers,
  RegionResolvers,
  BureauResolvers,
  UserResolvers,
  TeamResolvers,
  DocumentResolvers,
  VideoResolvers,
  PackageResolvers
);

const fetchUser = async req => {
  const { americaCommonsToken } = req.cookies;

  if ( !americaCommonsToken ) {
    return null;
  }

  let user = null;
  const { userId } = jwt.verify( americaCommonsToken, process.env.PUBLISHER_APP_SECRET );

  if ( userId ) {
    user = await prisma.user( { id: userId } );
  }

  // return valid user if exists
  return user;
};


// Create Apollo server
const createApolloServer = () => new ApolloServer( {
  typeDefs,
  resolvers,
  introspection: true,
  // subscriptions: { // currently disabled
  //   path: '/subscription',
  //   onConnect: () => {},
  //   onDisconnect: () => {},
  //   onOperation: ( message, params ) => params
  // },
  context: async ( { req, res } ) => {
    // subscription connection: websocket, currently disabled
    // if ( connection ) {
    //   return { ...connection.context, prisma };
    // }

    const user = await fetchUser( req );
    console.log( `USER ON CTX ${JSON.stringify( user )}` );
    return {
      req,
      res,
      prisma,
      user
    };
  },
  playground: {
    settings: {
      // Needed for auth
      // Docs: https://github.com/prisma/graphql-playground
      'request.credentials': 'same-origin'
    }
  }
} );

export default createApolloServer;
