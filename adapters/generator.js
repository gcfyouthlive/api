var Q = require('q')
  , fs = require('fs')
  , qr = require('qr-image')
  , pdf = require('html-pdf')

exports.generatePDF = function(camper) {
  var defer = Q.defer();

  var options = {
    "format": 'Letter',
    "border": "0.5in",
  };

  var dir = '../qr';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  };

  // Create QR with hyperlink to validation link and save in qr/ folder
  var qr_svg = qr.image('https://api.gcfyouthlive.com/campers/' + camper._id + '/validation', {type: 'svg'});
  qr_svg.pipe(fs.createWriteStream(dir+camper._id+'.svg'));

  // Read pdf.html from assets and replace fields with camper details
  var html = fs.readFileSync('assets/pdf.html', 'utf8')
  html = html.replace(/CAMPER_ID/g, camper._id);
  html = html.replace(/FIRST_NAME/g, camper.first_name);
  html = html.replace(/LAST_NAME/g, camper.last_name);

  // Create pdf
  pdf.create(html, options).toFile('pdf/'+camper._id+'.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res);
    defer.resolve(
      {
        status_code: 200,
        message: 'PDF Created',
        filepath: res.filename
      }
    )
  });

  return defer.promise;
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
