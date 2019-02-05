// Sets the HTML and text versions on the confirmation email
export const confirmationEmail = link => {
  const body = {
    // eslint-disable-next-line no-useless-escape
    html: `<div className=\"email\" style=\"\n    border: 1px solid black;\n    padding: 20px;\n    font-family: sans-serif;\n    line-height: 2;\n    font-size: 20px;\n  \">\n    <h2>Greetings!</h2>\n    <p>Confirm your account by using the link below:\n\n<a href=\"${link}\">Click Here to Confirm</a></p>\n\n    <p>The Content Commons Team</p>\n  </div>`,
    text: `Greetings! Confirm your account by using the link: ${link}. The Content Commons Team`
  };

  return body;
};

// Appends confirmation link to existing body
export const passwordResetEmail = ( text, link, linkText ) => {
  const body = {
    // eslint-disable-next-line no-useless-escape
    html: `<div className=\"email\" style=\"\n    border: 1px solid black;\n    padding: 20px;\n    font-family: sans-serif;\n    line-height: 2;\n    font-size: 20px;\n  \">\n    <h2>Greetings!</h2>\n    <p>${text}\n\n<a href="${link}">${linkText}</a></p>\n\n    <p>The Content Commons Team</p>\n  </div>`,
    text: `Greetings! ${text} ${link}. The Content Commons Team`
  };

  return body;
};
