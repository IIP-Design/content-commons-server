// Sets the HTML and text versions on the confirmation email
export const confirmationEmail = ( link, team ) => {
  const body = {
    // eslint-disable-next-line no-useless-escape
    html: `<div className=\"email\" style=\"\n    border: 1px solid black;\n    padding: 20px;\n    font-family: sans-serif;\n    line-height: 2;\n    font-size: 20px;\n  \">\n    <h2>Welcome to Content Commons.</h2>\n    <p>You have been successfully added to ${ team }!</p>\n\n     <p>You are one step away from registering your account. Please finish setting up your account by following the link below.</p>\n\n <p><a href=\"${link}\">Click Here to Confirm</a></p>\n\n    <p>This link will expire in 24 hours. If you need to request a new password creation link, please notify your team's administrator.</p>\n\n    <p>For tips on how to get started with Content Commons, check out our <a href="https://commons.america.gov/help">help page</a>.</p>\n\n    <p>Best,<br />Steven<br />Content Commons Support Team</p>\n  </div>`,
    text: `Welcome to Content Commons. You have been successfully added to ${team}! You are one step away from registering your account adding your content. Please finish setting up your account, by following the link below: ${link} This link will expire in 24 hours. If you need to request a new password creation link, please notify your team’s administrator. For tips on how to get started with Content Commons, check out our help page. Best, Steven, Content Commons Support Team`
  };

  return body;
};

// Appends confirmation link to existing body
export const passwordResetEmail = ( text, link, linkText ) => {
  const body = {
    // eslint-disable-next-line no-useless-escape
    html: `<div className=\"email\" style=\"\n    border: 1px solid black;\n    padding: 20px;\n    font-family: sans-serif;\n    line-height: 2;\n    font-size: 20px;\n  \">\n    <h2>Welcome to Content Commons.</h2>\n    <p>${text}\n\n<a href="${link}">${linkText}</a></p>\n\n    <p>The Content Commons Team</p>\n  </div>`,
    text: `Welcome to Content Commons. ${text} ${link}. The Content Commons Team`
  };

  return body;
};
