'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var YGroupSchema = new Schema({
  leader: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('YGroup', YGroupSchema)
