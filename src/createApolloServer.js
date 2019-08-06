import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import merge from 'lodash/merge';
import path from 'path';
import AuthResolvers from './resolvers/Auth';
import LanguageResolvers from './resolvers/Language';
import TaxonomyResolvers from './resolvers/Taxonomy';
import TeamResolvers from './resolvers/Team';
import UserResolvers from './resolvers/User';
import UtilResolvers from './resolvers/Util';
import VideoResolvers from './resolvers/Video';
import { prisma } from './schema/generated/prisma-client';

const typeDefs = importSchema( path.resolve( 'src/schema/index.graphql' ) );

const resolvers = merge(
  AuthResolvers,
  UtilResolvers,
  LanguageResolvers,
  TaxonomyResolvers,
  UserResolvers,
  TeamResolvers,
  VideoResolvers
);

// Create Apollo server
const createApolloServer = () => new ApolloServer( {
  typeDefs,
  resolvers,
  introspection: true,
  subscriptions: {
    path: '/subscription',
    onConnect: () => {
      console.log( 'Connect to websocket' );
    },
    onDisconnect: ( ) => {
      console.log( 'Diconnected from websocket' );
    },
    onOperation: ( message, params ) => {
      console.log( message );
      console.log( params );
      return params;
    },
  },
  context: async ( { connection, ...other } ) => {
    if ( connection ) {
      return { ...connection.context, prisma };
    }
    return { ...other, prisma };
  }
} );

export default createApolloServer;
