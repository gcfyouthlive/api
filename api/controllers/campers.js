'use strict';
var mongoose = require('mongoose'),
    Camper = mongoose.model('Camper'),
    DiscipleshipMeetup = mongoose.model('DiscipleshipMeetup'),
    generator = require('../../adapters/generator'),
    emailAdapter = require('../../adapters/emailer')

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
          subject: 'Thank you for registering! Insert mock text here.',
          text: 'Hello, ' + camper.nickname + ' ' + camper.last_name + '!!  Thank you for signing up for CAMP LIVE: VERIFIED (High School Camp)! There are a few more steps to complete your registration for camp. Please print the waiver attached to this email and have your parent/legal guardian sign it. This is a requirement to participate in camp. You can submit your signed waiver at our booth at the GCF lobby along with your camp payment. Our booth is open on Saturdays at the Youth Service and Sundays in between Sundary Services. Early bird - P2,000 until April 29, 2018 Regular - P2,500 until May 13, 2018. Take note that payment must be made to secure your slot in camp. If you have any questions about the registration process, you may reply to this email or contact us at 09175327741. See you soon! :)',
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
