'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OneOnOne = new Schema({
  discipler: Schema.Types.ObjectId,
  disciplee: Schema.Types.ObjectId
});

module.exports = mongoose.model('OneOnOne', OneOnOneSchema)
