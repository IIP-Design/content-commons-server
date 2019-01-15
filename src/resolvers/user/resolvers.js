import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { verifyGoogleToken } from '../../services/googleAuth';

export default {
  Query: {
    authenticatedUser( parent, args, ctx ) {
      // Check for current user id
      if ( !ctx.req.userId ) {
        return null;
      }
      return ctx.prisma.user( { id: ctx.req.userId } );
    }
  },

  Mutation: {
  // signin( parent, { email }, ctx ) {
  //   // 1. check if there is a user with that email
  //   // 2. check if password is correct
  //   // 3. generate jwt token
  //   // 4. set cookie with the token
  //   // 5. return the user
  // },

    /**
   *
   * @param {*} parent
   * @param {object} args { token } google tokenId
   * @param {object} ctx
   */
    async googleSignin( parent, { token }, ctx ) {
      // 1. Was a google token sent?
      if ( !token ) {
        throw new AuthenticationError( 'A vaid Google token is not avaialble' );
      }

      // 2. Verify that the google token sent is vaild
      const googleUser = await verifyGoogleToken( token );

      // 3. Verify that the google token sent is within the america.gov domain
      if ( googleUser.hd !== 'america.gov' ) {
        throw new AuthenticationError( 'You must use an america.gov email address' );
      }

      // 4. Check to see if user is in the db, if not create & save user
      let user = await ctx.prisma.user( { email: googleUser.email } );
      if ( !user ) {
        user = await ctx.prisma.createUser( {
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          email: googleUser.email,
          permissions: { set: ['EDITOR'] },
          isConfirmed: true
        } );
      }

      // 5.Create user's JWT token
      const jwtToken = jwt.sign( { userId: user.id }, process.env.PUBLISHER_APP_SECRET );

      // 6.Set the jwt as a cookie on the response
      ctx.res.cookie( 'americaCommonsToken', jwtToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
      } );

      // 7.Return user
      return user;
    },

    /**
     * Log user out by deleting cookie
     */
    signOut( parent, args, ctx ) {
      ctx.res.clearCookie( 'americaCommonsToken' );
      return 'Bye';
    }
  }
};
