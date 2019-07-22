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
import SubscriptionResolvers from './resolvers/Subscription';
import { prisma } from './schema/generated/prisma-client';

export const typeDefs = importSchema( path.resolve( 'src/schema/index.graphql' ) );

const resolvers = merge(
  AuthResolvers,
  UtilResolvers,
  LanguageResolvers,
  TaxonomyResolvers,
  UserResolvers,
  TeamResolvers,
  VideoResolvers,
  SubscriptionResolvers
);

// Create Apollo server
const createServer = () => new ApolloServer( {
  typeDefs,
  resolvers,
  introspection: true,
  context: async ( { connection, ...other } ) => {
    if ( connection ) {
      return { ...connection.context, prisma };
    }
    return { ...other, prisma };
  },
  subscriptions: {
    onConnect: async ( connectionParams, webSocket, context ) => Promise.resolve( { ...context, prisma } ),
    onDisconnect: connectionParams => ( { ...connectionParams, prisma } ),
  }
} );

export default createServer;
