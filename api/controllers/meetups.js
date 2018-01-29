'use strict';
var mongoose = require('mongoose'),
    DiscipleshipMeetup = mongoose.model('DiscipleshipMeetup');

exports.get_all_meetups = function(req, res) {
  DiscipleshipMeetup.find({}, null, {sort: '-meetup_date'}, function(err, meetup) {
    if (err) res.send(err)
    res.json(meetup)
  })
}

exports.add_a_meetup = function(req, res) {
  var new_meetup = new DiscipleshipMeetup(req.body)
  new_meetup.save(function(err, meetup) {
    if (err) res.send(err)
    res.json(meetup)
  })
}

exports.view_a_meetup = function(req, res) {
  DiscipleshipMeetup.findById(req.params.meetupId, function(err, meetup) {
    if (err) res.send(err)
    res.json(meetup)
  })
}

exports.update_a_meetup = function(req, res) {
  DiscipleshipMeetup.findOneAndUpdate({_id: req.params.meetupId}, req.body, {new: true}, function(err, meetup) {
    if (err) res.send(err)
    res.json(meetup)
  })
}

exports.delete_a_meetup = function(req, res) {
  DiscipleshipMeetup.remove({_id: req.params.meetupId}, function (err, meetup) {
    if (err) res.send(err)
    res.json({message: "Meetup sucessfully deleted"})
  })
}

