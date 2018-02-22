var nodemailer = require('nodemailer')
  , config = require('../config/credentials.json')
  , fs = require('fs')
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

exports.sendEmail = function (emailDetails) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user, // generated ethereal user
      pass: config.pass  // generated ethereal password
    }
  });
  console.log('email', emailDetails)
  // setup email data with unicode symbols
  var mailOptions
  fs.readFile(emailDetails.filepath, function (err, data) {
    if (err) throw err;
    mailOptions = {
      from: 'GCFYouthLive', // sender address
      to: emailDetails.recipient, // list of receivers
      subject: emailDetails.subject, // Subject line
      text: emailDetails.text, // plain text body
      attachments: [ // attachments
        {
          filename: 'Camp_Parental_Consent_Form.pdf',
          content: data,
          contentType: 'application/pdf'
        }
      ]
    };
    if (mailOptions == null) {
      throw new Error('File not found. Please try again.');
    } else {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw error;
        }
        return {
          status_code: 200
          , message: 'Email Sent!'
        };
      });
    }
  });
}
