var mongoose = require('mongoose')
var Schema = mongoose.Schema


var CamperSchema = new Schema({
  first_name: {
    type: String,
    required: 'This field is required!'
  },
  nickname: {
    type: String,
    required: 'This field is required!'
  },
  last_name: {
    type: String,
    required: 'This field is required!'
  },
  middle_initial: {
    type: String
  },
  birthdate: {
    type: Date,
    required: 'This field is required!'
  },
  gender: {
    type: String,
    required: 'This field is required!'
  },
  school: {
    type: String,
    required: 'This field is required!'
  },
  year: {
    type: String,
    required: 'This field is required!'
  },
  course: {
    type: String
  },
  email: {
    type: String,
    required: 'This field is required!'
  },
  mobileno: {
    type: String,
    required: 'This field is required!'
  },
  facebook_id: {
    type: String
  },
  shirt_size: {
    type: String,
    required: 'This field is required!'
  },
  church: {
    type: String,
    required: 'This field is required!'
  },
  gcf_member: {
    type: Boolean,
    required: 'This field is required!'
  },
  gcf_service: {
    type: String
  },
  youth_group: {
    type: Boolean,
    required: 'This field is required!'
  },
  youth_group_leader: {
    type: String
  },
  camp_first_time: {
    type: Boolean,
    required: 'This field is required!'
  },
  allergies: {
    type: String
  },
  medications: {
    type: String
  },
  note: {
    type: String
  },
  father_name: {
    type: String,
    required: 'This field is required!'
  },
  father_birthday: {
    type: Date,
    required: 'This field is required!'
  },
  father_contactno: {
    type: String,
    required: 'This field is required!'
  },
  mother_name: {
    type: String,
    required: 'This field is required!'
  },
  mother_birthday: {
    type: Date,
    required: 'This field is required!'
  },
  mother_contactno: {
    type: String,
    required: 'This field is required!'
  }
  //  relationships: [ObjectId]
});

module.exports = mongoose.model('Camper', CamperSchema)
