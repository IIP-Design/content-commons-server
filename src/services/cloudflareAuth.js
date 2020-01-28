import jwt from 'jsonwebtoken';
import axios from 'axios';
import jwkToPem from 'jwk-to-pem';

export const verifyCloudflareToken = async token => {
  const certUrl = `${process.env.CLOUDFLARE_AUTH_DOMAIN}/cdn-cgi/access/certs`;
  const keySet = await axios.get( certUrl );

  if ( keySet && keySet.data && keySet.data.keys ) {
    const decoded = jwt.decode( token, { complete: true } );
    const key = keySet.data.keys.filter( _key => _key.kid === decoded.header.kid );
    const pem = key.length ? jwkToPem( key[0] ) : '';
    const policyAudience = process.env.CLOUDFLARE_POLICY_AUD;
    // const options = { algorithms: ['RS256'], audience: policyAudience };

    try {
      return jwt.verify( token, pem, { algorithms: ['RS256'], audience: policyAudience } );
    } catch ( err ) {
      return err;
    }
  }

  return { message: 'Key set not found.' };
};
