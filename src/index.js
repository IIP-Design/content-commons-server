import 'dotenv/config';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import http from 'http';
import express from 'express';
import cors from 'cors';
import createServer from './createServer';
import socket from './services/es/socket';
import pubsub from './services/subscriptions/pubsub';

// Create Apollo server
const server = createServer();

// Create Express server
const app = express();

// Mount middleware to run before Apollo.
app.use( cookieParser() );

// Decode the JWT token on cookie so we can put the userId on each request
app.use( ( req, res, next ) => {
  const { americaCommonsToken } = req.cookies;

  if ( americaCommonsToken ) {
    const { userId } = jwt.verify( americaCommonsToken, process.env.PUBLISHER_APP_SECRET );

    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
} );

// Apply middleware to Apollo
server.applyMiddleware( {
  app,
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
} );

// Connect socket to public API
socket.connect();

// Create server for PubSub socket
const pubsubApp = express();
pubsubApp.use( cors( {
  origin: process.env.FRONTEND_URL,
  credentials: true
} ) );

const pubsubServer = http.createServer( pubsubApp );

pubsub.connect( pubsubServer );

// Start listening...
app.listen( { port: 4000 }, () => {
  console.log( `🚀 Server ready at http://localhost:4000${server.graphqlPath}` );
} );

pubsubServer.listen( { port: 5000 }, () => {
  console.log( '   PubSub ready at http://localhost:5000' );
} );
