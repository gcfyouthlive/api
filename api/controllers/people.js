'use strict';
var mongoose = require('mongoose'),
    Person = mongoose.model('Person'),
    DiscipleshipMeetup = mongoose.model('DiscipleshipMeetup')

exports.get_all_persons = function(req, res) {
  Person.find({}).sort({first_name: 1, last_name: 1}).exec(function(err, person) {
    if (err) res.send(err)
    res.json(person)
  })
}

exports.add_a_person = function(req, res) {
  var new_person = new Person(req.body);
  new_person.save(function(err, person) {
    if (err) res.send(err)
    res.json(person)
  })
}

exports.view_a_person = function(req, res) {
  Person.findById(req.params.personId, function(err, person) {
    if (err) res.send(err)
    res.json(person)
  });
}

exports.update_a_person = function(req, res) {
  Person.findOneAndUpdate({_id: req.params.personId}, req.body, {new: true}, function(err, person) {
    if (err) res.send(err)
    res.json(person)
  })
}

exports.delete_a_person = function(req, res) {
  Person.remove({_id: req.params.personId}, function(err, person) {
    if (err) res.send(err)
    res.json({message: "Person successfully deleted"})
  })
}

exports.add_a_discipler = function(req, res) {
  return null
}

exports.delete_a_disciple = function(req, res) {
  return null
}

exports.get_person_meetups = function(req, res) {
  DiscipleshipMeetup.find({$or: [{discipler: req.params.personId}, {disciplee: req.params.personId}]}, function(err, meetup) {
    if (err) res.send(err)
    res.json(meetup)
  })
}

exports.get_age_demographic_stats = function(req, res) {
  Person.aggregate( [
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
  Person.aggregate( [
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
  Person.aggregate( [
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
