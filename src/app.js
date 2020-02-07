import 'dotenv/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import express from 'express';

// Create Express server
const app = express();

// Mount middleware to run before Apollo.
app.use( cookieParser(), helmet(), compression() );

export default app;
