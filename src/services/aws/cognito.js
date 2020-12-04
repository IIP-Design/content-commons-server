import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import jwkToPem from 'jwk-to-pem';

const cognitoPoolId = process.env.AWS_COGNITO_USER_POOLS_ID || '';
const cognitoIssuer = `https://cognito-idp.us-east-1.amazonaws.com/${cognitoPoolId}`;
const cognitoClientId = process.env.AWS_COGNITO_USER_POOL_WEB_CLIENT_ID;

let cacheKeys;

if ( !cognitoPoolId ) {
  throw new Error( 'env var required for Cognito Pool' );
}

/**
 * This public key can be used to verify the signature of a jwt token
 * @returns map of AWS Cognito public keys by kid (key ID).
 */
const getPublicKeys = async () => {
  if ( !cacheKeys ) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const publicKeys = await axios.get( url );

    cacheKeys = publicKeys.data.keys.reduce( ( agg, current ) => {
      const pem = jwkToPem( current );

      agg[current.kid] = { instance: current, pem };

      return agg;
    }, {} );

    return cacheKeys;
  }

  return cacheKeys;
};

/**
 *
 * Resources
 * https://cognito-idp.us-east-1.amazonaws.com/us-east-1_U4E93HWMq/.well-known/jwks.json
 *
 * @param - kid - Key ID of public key used to sign JWT
 * @returns - return a JSON Web Key (JWK) for kid
 */
const getJwkByKid = async kid => {
  const keys = await getPublicKeys();
  const publicKey = keys[kid];

  // if the public key is missing reload cache and try one more time
  // https://forums.aws.amazon.com/message.jspa?messageID=747599
  if ( !publicKey ) {
    cacheKeys = undefined;
    const keys2 = await getPublicKeys();
    const publicKey2 = keys2[kid];

    if ( !publicKey2 ) {
      return null;
    }

    return publicKey2.instance;
  }

  return publicKey.instance;
};

/**
 *
 * @param {Object} Destrucutred decoded token
 * @returns Boolean Claims successfully verified?
 */
// eslint-disable-next-line camelcase
const verifyClaims = ( { token_use, aud, iss } ) => token_use === 'id' && iss === cognitoIssuer && aud === cognitoClientId;

/**
 *
 * @param {Object} token Cognito token
 * @returns - Decoded user token
 */
export const verifyCognitoToken = async token => {
  // https://github.com/awslabs/aws-support-tools/tree/master/Cognito/decode-verify-jwt
  const jwtDecoded = jwt.decode( token, { complete: true } );
  const jwk = await getJwkByKid( jwtDecoded.header.kid ).catch( err => {
    throw new AuthenticationError( `Unable to get a JSON Web Key (JWK) for the supplied kid: ${err.toString()}` );
  } );

  if ( jwk === null ) {
    throw new AuthenticationError( 'Unable to verify Cognito Token' );
  }
  const pem = jwkToPem( jwk );

  return jwt.verify( token, pem, { algorithms: ['RS256'] }, ( err, decoded ) => {
    if ( !verifyClaims( decoded ) ) {
      throw new AuthenticationError( 'Unauthorized user. The AWS Cognito issuer, audience or token use did not match' );
    }

    return decoded;
  } );
};
