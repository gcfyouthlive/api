var generator = require("./qrAdapter/generator")
, emailer = require('./emailAdapter/emailer')

generator.generateQR('12345').then((res) => {
  var params = {
    recipient: 'jcokingli@gmail.com',
    subject: 'Your QR code2',
    text: 'Thank you for registering!',
    filepath: './QR/qr_12345.pdf'
  }
  console.log('sending');
  emailer.sendEmail(params);
}).catch((err) => 
  console.log('fail', err)
)




