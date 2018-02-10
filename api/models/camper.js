var mongoose = require('mongoose')
var Schema = mongoose.Schema


var CamperSchema = new Schema({
  given_name: {
    type: String
  },
  first_name: {
    type: String,
    required: 'This field is required!'
  },
  nickname: {
    type: String,
  },
  last_name: {
    type: String,
    required: 'This field is required!'
  },
  full_name: {
    type: String
  },
  birthdate: {
    type: Date
  },
  gender: {
    type: String
  },
  school: {
    type: String
  },
  year: {
    type: String
  },
  course: {
    type: String
  },
  church: {
    type: String
  },
  notes: {
    type: String
  },
  email: {
    type: String
  },
  mobileno: {
    type: String
  },
  facebook_id: {
    type: String
  },
  disciplers: {
    type: [Schema.Types.ObjectId]
  },
  disciples: {
    type: [Schema.Types.ObjectId]
  }

//  relationships: [ObjectId]
});

module.exports = mongoose.model('Camper', CamperSchema)
