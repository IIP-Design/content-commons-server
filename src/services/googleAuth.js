import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

export const verifyGoogleToken = async token => {
  console.log( `server : ${process.env.GOOGLE_CLIENT_ID}` );
  const ticket = await client.verifyIdToken( {
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  } );
  // check for america.gov domain
  return ticket.getPayload();
};
