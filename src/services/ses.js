const AWS = require( 'aws-sdk' );

// Pulls in configs from .env
AWS.config.update( {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
} );

// Creates new instance of AWS SES
const ses = new AWS.SES();

// Sets the parameters required to send email
export const setSesParams = ( recipient, body, subject ) => (
  {
    Destination: {
      ToAddresses: [recipient]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body.html
        },
        Text: {
          Charset: 'UTF-8',
          Data: body.text
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    ReplyToAddresses: [`${process.env.MAIL_RETURN_ADDRESS}`],
    Source: `${process.env.MAIL_RETURN_ADDRESS}`
  }
);

// Function to handle errors
const handleResponse = ( err, data ) => {
  if ( err ) console.log( err, err.stack );
  else console.log( data );
};

// Sends email
export const sendSesEmail = params => {
  ses.sendEmail( params, ( err, data ) => { handleResponse( err, data ); } );
};
