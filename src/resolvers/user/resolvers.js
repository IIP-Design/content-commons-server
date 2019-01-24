import { ApolloError, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { transport, createEmailMessage } from '../../services/mail';
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
  /**
   * @param {object} args { token } google tokenId
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

    // signin( parent, { email }, ctx ) {
    // 1. check if there is a user with that email
    // 2. check if password is correct
    // 3. generate jwt token
    // 4. set cookie with the token
    // 5. return the user
    // },


    /**
     * Creates an unconfirmed user in db then send confirmation email
     * @param {*} args { UserCreateInput }
     */
    async signUp( parent, args, ctx ) {
      try {
        // 1. Set a temporary token and expiry on that user for confirmation purposes
        const randomBytesPromiseified = promisify( randomBytes );
        const tempToken = ( await randomBytesPromiseified( 20 ) ).toString( 'hex' );
        const tempTokenExpiry = Date.now() + 3600000; // 1 hour from now
        const userWithToken = { ...args.data, tempToken, tempTokenExpiry };

        // 2. Create an unconfirmed user in the db
        const user = await ctx.prisma.createUser( userWithToken );

        // 3. Email the user
        if ( user ) {
          const htmlEmail = createEmailMessage(
            `Confirm your account by using the link below:\n\n<a href="${process.env.FRONTEND_URL}/confirm?tempToken=${tempToken}">Click Here to Confirm</a>`
          );

          // 2. Email user a link to confirm account
          const mailResponse = await transport.sendMail( {
            from: process.env.MAIL_RETURN_ADDRESS,
            to: user.email,
            subject: 'Please confirm your account',
            html: htmlEmail
          } );
        }

        return {
          text: 'Please check your email for a link to confirm your registration'
        };
      } catch ( err ) {
        throw new ApolloError( err ); // debugging
        // throw new ApolloError( 'There is already a user with that email in the system.' );
      }
    },

    /**
     * Log user out by deleting cookie
     */
    signOut( parent, args, ctx ) {
      ctx.res.clearCookie( 'americaCommonsToken' );
      return 'Bye';
    },

    /**
     * Verify temporary token is still valid, and passwords match
     * If so, update isConfirmed user property and store password
     * Then create a token, set cookie and return user
     * @param {*} args
     */
    async confirmRegistration( parent, args, ctx ) {
      // 1. Verify passwords match.  This is a second check as it is
      if ( args.password !== args.confirmPassword ) {
        throw new AuthenticationError( "Your Passwords don't match!" );
      }
      // 2. check if its a legit reset token
      // 3. Check if its expired
      const [user] = await ctx.prisma.users( {
        where: {
          tempToken: args.tempToken,
          tempTokenExpiry_gte: Date.now() - 3600000,
        },
      } );

      if ( !user ) {
        throw new AuthenticationError( 'This token is either invalid or expired!' );
      }

      // 4. Hash their new password
      const password = await bcrypt.hash( args.password, 10 );

      // 5. Save the new password to the user and remove old tempToken fields
      const updatedUser = await ctx.prisma.updateUser( {
        where: { email: user.email },
        data: {
          password,
          isConfirmed: true,
          tempToken: null,
          tempTokenExpiry: null
        },
      } );

      // 6. Generate JWT
      const jwtToken = jwt.sign( { userId: user.id }, process.env.PUBLISHER_APP_SECRET );

      // 7. Set the JWT cookie
      ctx.res.cookie( 'americaCommonsToken', jwtToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
      } );

      // 8. return the new user
      return updatedUser;
    }

  }
};
