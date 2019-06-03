import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import AuthResolvers from './resolvers/Auth';
import LanguageResolvers from './resolvers/Language';
import TaxonomyResolvers from './resolvers/Taxonomy';
import TeamResolvers from './resolvers/Team';
import UserResolvers from './resolvers/User';
import UtilResolvers from './resolvers/Util';
import VideoResolvers from './resolvers/Video';
import merge from 'lodash/merge';
import path from 'path';
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
const createServer = () => new ApolloServer( {
  typeDefs,
  resolvers,
  introspection: true,
  context: req => ( { ...req, prisma } )
} );

export default createServer;
