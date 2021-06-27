import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import path from 'path';
import jwt from 'jsonwebtoken';

import resolvers from './resolvers';
import { prisma } from './schema/generated/prisma-client';


const typeDefs = importSchema( path.resolve( 'src/schema/index.graphql' ) );

const fetchUser = async req => {
  const { americaCommonsToken } = req.cookies;

  const publicUser = {
    email: '',
    permissions: [],
    isConfirmed: false,
    lastName: '',
    firstName: '',
    id: 'public',
  };

  if ( !americaCommonsToken ) {
    return publicUser;
  }

  let user = null;
  const { userId } = jwt.verify( americaCommonsToken, process.env.PUBLISHER_APP_SECRET );

  if ( userId ) {
    user = await prisma.user( { id: userId } );
  } else {
    user = publicUser;
  }

  // return valid user if exists
  return user;
};


// Create Apollo server
const createApolloServer = () => new ApolloServer( {
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
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

    return {
      req,
      res,
      prisma,
      user,
    };
  },
  playground: {
    settings: {
      // Needed for auth
      // Docs: https://github.com/prisma/graphql-playground
      'request.credentials': 'same-origin',
    },
  },
} );

export default createApolloServer;
