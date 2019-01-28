import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import merge from 'lodash/merge';
import AuthResolvers from './resolvers/auth';
import UserResolvers from './resolvers/user';
import TeamResolvers from './resolvers/team';
import VideoResolvers from './resolvers/video';
import { prisma } from './generated/prisma-client';


const typeDefs = importSchema( path.resolve( 'src/schema.graphql' ) );
const resolvers = merge(
  AuthResolvers,
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
