import 'dotenv/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import jwt from 'jsonwebtoken';
import express from 'express';

// Create Express server
const app = express();

// Mount middleware to run before Apollo.
app.use( cookieParser(), helmet(), compression() );

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

export default app;
