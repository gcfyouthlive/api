var http = require('http')
  , fs = require('fs')
  , qr = require('qr-image')
  , options
  , config = require('../config/config.json')
  , PDFDocument = require('pdfkit') //documentation: http://pdfkit.org/index.html

exports.generateQR = function(camper_id) {
  var qr_svg = qr.image('https://api.gcfyouthlive.com/campers/' + camper_id + '/validation', {type: 'svg'});
  qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));
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
