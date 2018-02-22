The following files are needed to launch the server:
- /config/credentials.json

To setup the email adapter, you will need to create a credentials.json
file in /config folder with the following format:

{
  "user": "text",
  "pass": "text",
  "name": "text"
}

Furthermore to use emailer's sendEmail your emailDetails should be as follows:

{
  recipient: receiver@gmail.com
  subject: 'subject line'
  text: 'this is my message'
  filepath: <PDF's filepath goes here>
}

For more information regarding nodemailer: https://nodemailer.com/about/
