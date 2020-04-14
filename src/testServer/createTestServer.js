import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
// eslint-disable-next-line
import { createTestClient } from 'apollo-server-testing';
import merge from 'lodash/merge';
import path from 'path';
import AuthResolvers from '../resolvers/Auth';
import LanguageResolvers from '../resolvers/Language';
import RegionResolvers from '../resolvers/Region';
import BureauResolvers from '../resolvers/Bureau';
import TaxonomyResolvers from '../resolvers/Taxonomy';
import TeamResolvers from '../resolvers/Team';
import UserResolvers from '../resolvers/User';
import UtilResolvers from '../resolvers/Util';
import DocumentResolvers from '../resolvers/Document';
import VideoResolvers from '../resolvers/Video';
import PackageResolvers from '../resolvers/Package';

const typeDefs = importSchema( path.resolve( 'src/schema/index.graphql' ) );

const resolvers = merge(
  AuthResolvers,
  UtilResolvers,
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

const createTestServer = ctx => {
  const server = new ApolloServer( {
    typeDefs,
    resolvers,
    mockEntireSchema: false, // keeps existing resolvers in schema
    mocks: true, // allows for custom mocks
    context: () => ctx
  } );

  return createTestClient( server );
};

export default createTestServer;
