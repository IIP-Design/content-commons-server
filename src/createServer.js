import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import merge from 'lodash/merge';
import AuthResolvers from './resolvers/Auth';
import LanguageResolvers from './resolvers/Language';
import TaxonomyResolvers from './resolvers/Taxonomy';
import UserResolvers from './resolvers/User';
import TeamResolvers from './resolvers/Team';
import VideoResolvers from './resolvers/Video';
import { prisma } from './schema/generated/prisma-client';

const typeDefs = importSchema( path.resolve( 'src/schema/index.graphql' ) );

const resolvers = merge(
  AuthResolvers,
  LanguageResolvers,
  TaxonomyResolvers,
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
