import { AuthenticationError } from 'apollo-server-express';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import mapValues from 'lodash/mapValues';

export const requiresRole = role => resolver => {
  if ( isFunction( resolver ) ) {
    return ( parent, args, context, info ) => {
      if ( context.user && context.user.id !== 'public' && ( !role || context.user.permissions.includes( role ) ) ) {
        return resolver( parent, args, context, info );
      }
      throw new AuthenticationError( 'Unauthorized' );
    };
  } if ( isObject( resolver ) ) {
    return mapValues( resolver, requiresRole( role ) );
  }
  throw new Error( 'Resolver has to be Object or Function' );
};


export const subscribersOnly = requiresRole( 'SUBSCRIBER' );
export const teamAdminsOnly = requiresRole( 'TEAM_ADMIN' );
export const adminsOnly = requiresRole( 'ADMIN' );
export const requiresLogin = requiresRole( null );
