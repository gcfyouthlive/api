To setup the email adapter, you will need to create a credentials.json
file in this same folder with the following format:

{
  "user": "text",
  "pass": "text"
}

Furthermore to use emailer's sendEmail your emailDetails should be as follows:

{
  recipient: receiver@gmail.com
  subject: 'subject line'
  text: 'this is my message'
  filepath: <generateQR's filepath goes here>
}

For more information regarding nodemailer: https://nodemailer.com/about/