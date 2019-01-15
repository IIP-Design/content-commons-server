import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import merge from 'lodash/merge';
import UserResolvers from './resolvers/user/resolvers';
import TeamResolvers from './resolvers/team/resolvers';
import VideoResolvers from './resolvers/video/resolvers';
import { prisma } from './generated/prisma-client';

const typeDefs = importSchema( path.resolve( 'src/schema.graphql' ) );
const resolvers = merge(
  UserResolvers,
  TeamResolvers,
  VideoResolvers
);

// Create Apollo server
const createServer = () => new ApolloServer( {
  typeDefs,
  resolvers,
  context: req => ( { ...req, prisma } )
} );

export default createServer;
