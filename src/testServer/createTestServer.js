import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
// eslint-disable-next-line
import { createTestClient } from 'apollo-server-testing';
import path from 'path';
import resolvers from '../resolvers';

const typeDefs = importSchema( path.resolve( 'src/schema/index.graphql' ) );

const mocks = {
  DateTime: () => '2020-03-15T13:01:01.906Z',
  Float: () => 25555,
  String: () => 'mock string value'
};

const createTestServer = ctx => {
  const server = new ApolloServer( {
    typeDefs,
    resolvers,
    mockEntireSchema: false, // keeps existing resolvers in schema
    mocks, // allows for custom mocks
    context: () => ctx
  } );

  return createTestClient( server );
};

export default createTestServer;
