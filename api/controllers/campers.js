'use strict';
var mongoose = require('mongoose'),
    Camper = mongoose.model('Camper'),
    DiscipleshipMeetup = mongoose.model('DiscipleshipMeetup'),
    generator = require('../../adapters/generator'),
    emailAdapter = require('../../adapters/emailer');
const request = require('request');

exports.get_all_campers = function(req, res) {
  Camper.find({}).sort({first_name: 1, last_name: 1}).exec(function(err, camper) {
    if (err) res.send(err)
    res.json(camper)
  })
}

exports.add_a_camper = function(req, res) {
  var new_camper = new Camper(req.body);
  new_camper.save(function(err, camper) {
    if (err) res.send(err)
    else {
      generator.generatePDF(camper).then(function (campRes) {
        var emailParams = {
          recipient: camper.email,
          subject: 'Your registration to CampLIVE: VERIFIED', //TBD: Perhaps make it Your registration to CampLIVE: VERIFIED is almost complete!
          text: 'Hello, ' + camper.nickname + ' ' + camper.last_name + '!!  \n\nThank you for signing up for CAMP LIVE: VERIFIED (High School Camp)! There are a few more steps to complete your registration for camp. Please print the waiver attached to this email and have your parent/legal guardian sign it. This is a requirement to participate in camp. You can submit your signed waiver at our booth at the GCF lobby along with your camp payment. \n\nOur booth is open on Saturdays at the Youth Service and Sundays in between Sundary Services. Early bird - P2,000 until April 29, 2018 Regular - P2,500 until May 13, 2018. Take note that payment must be made to secure your slot in camp. \n\nIf you have any questions about the registration process, you may reply to this email or contact us at 09175327741. \n\nSee you soon! :)',
          filepath: campRes.filepath
        }
        emailAdapter.sendEmail(emailParams);
        res.json(camper);
      }).catch(function (err) {
        var out = {
          status:500,
          payload:''+err
        }
        res.status(500).send(out);
      });

      var data_str = "";
      data_str += "*Name: *" + camper.first_name + " " + camper.last_name + "\n";
      data_str += "*Nickname: *" + camper.nickname + "\n";
      data_str += "*Email: *" + camper.email + "\n";
      data_str += "*Gender: *" + camper.gender + "\n";
      data_str += "*Mobile no: *" + camper.mobileno + "\n";
      data_str += "*School: *" + camper.school + "\n";
      data_str += "*Year: *" + camper.year + "\n";
      data_str += "*Facebook ID: *" + camper.facebook_id + "\n";
      data_str += "*Notes: *" + camper.notes + "\n";

      var options = {
        uri: "https://hooks.slack.com/services/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",
        method: "POST",
        json: {"text": data_str, "mrkdwn": true}
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body)
        }
      })
    }
  })
}

exports.view_a_camper = function(req, res) {
  Camper.findById(req.params.camperId, function(err, camper) {
    if (err) res.send(err)
    res.json(camper)
  });
}

exports.update_a_camper = function(req, res) {
  Camper.findOneAndUpdate({_id: req.params.camperId}, req.body, {new: true}, function(err, camper) {
    if (err) res.send(err)
    res.json(camper)
  })
}

exports.set_payment_true = function(req, res) {
  Camper.findOneAndUpdate({_id: req.params.camperId}, { $set: { paid: true }}, {new: true}, function(err, camper) {
    if (err) res.send(err)
    res.json(camper)
  })
}

exports.delete_a_camper = function(req, res) {
  Camper.remove({_id: req.params.camperId}, function(err, camper) {
    if (err) res.send(err)
    res.json({message: "Camper successfully deleted"})
  })
}

exports.add_a_discipler = function(req, res) {
  return null
}

exports.delete_a_disciple = function(req, res) {
  return null
}

exports.get_camper_meetups = function(req, res) {
  DiscipleshipMeetup.find({$or: [{discipler: req.params.camperId}, {disciplee: req.params.camperId}]}, function(err, meetup) {
    if (err) res.send(err)
    res.json(meetup)
  })
}

exports.get_age_demographic_stats = function(req, res) {
  Camper.aggregate( [
    { $project: {
      "_id": 0,
      "age": { $subtract: [
              { $subtract: [
                { $year: new Date() },
                { $year: { $ifNull: ["$birthdate", new Date() ]} }
              ] },
              { $cond: [
                { $gte: [
                  { $dayOfYear: new Date() },
                  { $dayOfYear: { $ifNull: ["$birthdate", new Date() ]} }
                ] },
                0,
                1
              ] }
            ] },
        "gender": 1
    } },
    { $group: {
      "_id": {"age": "$age", "gender": "$gender"},
      count: { $sum: 1 }
    } },
    { $group: {
      _id: "$_id.age",
      counts: { $push: { k: "$_id.gender", v: "$count" } }
    } },
    { $project: {
      _id: 0,
      data: { $arrayToObject: { $concatArrays: [ [{k:"age", v:"$_id"}], "$counts"] } }
    } }
  ] ).exec(function (err, age_stats) {
    if (err) res.send(err)
    res.json(age_stats.map(function(i) {return i.data}))
  })
}

exports.get_year_demographic_stats = function(req, res) {
  Camper.aggregate( [
    { $group: {
      "_id": {"year": "$year", "gender": "$gender"},
      count: { $sum: 1 }
    } },
    { $group: {
      _id: "$_id.year",
      counts: { $push: { k: "$_id.gender", v: "$count" } }
    } },
    { $project: {
      _id: 0,
      data: { $arrayToObject: { $concatArrays: [ [{k:"year", v:"$_id"}], "$counts"] } }
    } }
  ] ).exec(function (err, age_stats) {
    if (err) res.send(err)
    res.json(age_stats.map(function(i) {return i.data}))
  })
}

exports.get_age_demographic_stats_d3 = function(req, res) {
  Camper.aggregate( [
    { $project: {
      "_id": 0,
      "age": { $subtract: [
              { $subtract: [
                { $year: new Date() },
                { $year: { $ifNull: ["$birthdate", new Date() ]} }
              ] },
              { $cond: [
                { $gte: [
                  { $dayOfYear: new Date() },
                  { $dayOfYear: { $ifNull: ["$birthdate", new Date() ]} }
                ] },
                0,
                1
              ] }
            ] },
        "gender": 1
    } },
    { $group: {
      "_id": {"age": "$age", "gender": "$gender"},
      count: { $sum: 1 }
    } },
    { $group: {
      _id: "$_id.gender",
      counts: { $push: { name: "$_id.age", value: "$count" } }
    } },
    { $project: {
      _id: 0,
      name: "$_id",
      series: "$counts"
    } }
  ] ).exec(function (err, age_stats) {
    if (err) res.send(err)
    console.log(age_stats)
    res.json(age_stats);
    // res.json(age_stats.map(function(i) {return i}))
  })
}
