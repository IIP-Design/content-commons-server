import 'dotenv/config';
import http from 'http';
import createApolloServer from './createApolloServer';
import app from './app';
import { initQueueAndStartListening } from './services/rabbitmq';

// Create Apollo server
const server = createApolloServer();

const PORT = process.env.PORT || 4000;

// Apply middleware to Apollo
server.applyMiddleware( {
  app,
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
} );

const httpServer = http.createServer( app );
server.installSubscriptionHandlers( httpServer );

// initialize rabbitmq (move to sep worker?)
initQueueAndStartListening();

//  We are calling `listen` on the http server variable, and not on `app`.
httpServer.listen( { port: PORT }, () => {
  console.log( `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}` );
  console.log( `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}` );
} );
