var http = require('http')
  , fs = require('fs')
  , options
  , config = require('./config')
  , Q = require('q')

module.exports = {
  generateQR: function (camperID) {
    var options = {
      host: config.url
      , path: '/v1/create-qr-code/?size=250x250&data=https://35.227.77.30/api/campers/' + camperID + '/validation'
    }
    var defer = Q.defer()
    var request = http.get(options, function (res) {
      var imagedata = ''
      res.setEncoding('binary')

      res.on('data', function (chunk) {
        imagedata += chunk
      })

      res.on('end', function () {
        var dir = config.dir;

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        fs.writeFile(dir + '/qr_' + camperID + '.png', imagedata, 'binary', function (err) {
          if (err) throw err
          defer.resolve({ status_code: 200, message: 'QR Created' })
        })
      })
    })
    request.on('error', function (err) {
      defer.reject(err)
    })
    request.end()
    return defer.promise;
  }


}

