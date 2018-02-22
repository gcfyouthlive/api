var http = require('http')
  , fs = require('fs')
  , qr = require('qr-image')
  , pdf = require('html-pdf')
  , PDFDocument = require('pdfkit') //documentation: http://pdfkit.org/index.html


exports.generateQR = function(camper_id) {
  var qr_svg = qr.image('https://api.gcfyouthlive.com/campers/' + camper_id + '/validation', {type: 'svg'});
  qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));
}

exports.generatePDF = function(camper) {
  var header = "Permission / Agreement Form";
  var legal = "As parents / legal guardian of the named participant (Participant),";
  var consent = "I understand and recognize that there may be inherent risks involved in the activities of CAMP LIVE: VERIFIED (High School Camp) held under the auspices of Greenhills Christian Fellowship (GCF), from May 31-June 3, 2017, at Batangas Country Club, and I hereby release, discharge, and hold harmless GCF, its camp organizers, volunteers, employees, contractors or subcontractors (Organizers), including the officers or trustees of GCF, from any and all liability for injuries, including those that may result in death, and/or illnesses incurred while participating or attending in said Camp. I also give my expressed consent to the Organizers to transport said Participant to and from the Camp venue in church- owned or leased vehicles, and hold GCF and/or the Organizers free from any liability for any injury to or damage to the person of the Participant or to his/her belongings during travel.";
  var medical = 'Moreover, in the event that I am not immediately available, should the Participant suffer a serious or life-threatening injury for which emergency medical treatment may be necessary, I hereby authorize the Organizers to engage qualified medical personnel to initiate any necessary medical treatment or care, and that they will use all reasonable efforts to notify me, where practical, and I hereby give permission to any such physician or other medical personnel to provide such medical treatment as deemed medically appropriate.'
  var disclaimer = "In compliance with the insurance company’s requirements, we kindly ask you to fill out your parents’ names and birthdates below.";
  var signing = "By signing this document, the parent or legal guardian confirms that he or she has authority to sign, has read the entire document, and has understanding that the document waives certain rights as above indicated.";

  var options = {
    "format": 'Letter',
    "border": "0.5in",
  };

  var html = fs.readFileSync('/app/assets/pdf.html', 'utf8');
  pdf.create(html, options).toFile('./test.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
}

// module.exports = {
//   generateQR: function (camperID) {
//     var defer = Q.defer()
//     var request = http.get(options, function (res) {
//       var imagedata = ''
//       res.setEncoding('binary')
//
//       res.on('data', function (chunk) {
//         imagedata += chunk
//       })
//
//       res.on('end', function () {
//         var dir = config.dir;
//         var doc = new PDFDocument;
//         if (!fs.existsSync(dir)) {
//           fs.mkdirSync(dir);
//         }
//
//
//         //fs.writeFile(dir + '/qr_' + camperID + '.pdf', 'test', function (err){
//         //if (err) throw err
//         //console.log(imagedata)
//         var directory = dir + '/qr_' + camperID + '.png'
//         fs.writeFile(directory, imagedata, 'binary', function (err) {
//           if (err) throw err
//           doc.pipe(fs.createWriteStream(dir + '/qr_' + camperID + '.pdf'))
//           doc.image(directory,
//             200, //x-position
//             40, //y-position
//             {
//               width: 100,
//               height: 100
//             })
//             .text('My Text is here'
//               , 200
//               , 30)
//           doc.end()
//           //Workaround for now, defer.resolve doesn't wait for doc.end() before resolving.
//           setTimeout(() => {
//             defer.resolve(
//               {
//                 status_code: 200
//                 , message: 'QR Created'
//                 , filepath: dir + '/qr_' + camperID + '.pdf'
//               }
//             )
//           }, 1000)
//
//         })
//       })
//     })
//     request.on('error', function (err) {
//       defer.reject(err)
//     })
//     request.end()
//     return defer.promise;
//   }
// }
