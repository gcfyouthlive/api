var mongoose = require('mongoose')
var Schema = mongoose.Schema


var DiscipleshipMeetupSchema = new Schema({
  kind: {
    type: String,
    validate: {
      validator: function(v) {
        return /one-on-one|y-group|growth-group|mentoring/.test(v)
      },
      message: '{VALUE} is invalid'
    },
    required: 'Kind is required'
  },
  discipler: {
    type: Schema.Types.ObjectId,
    required: 'Discipler is required'
  },
  disciplee: {
    type: Schema.Types.ObjectId,
    required: 'Disciplee is required'
  },
  meetup_date: {
    type: Date,
    required:  'Date is required'
  }
})

module.exports = mongoose.model('DiscipleshipMeetup', DiscipleshipMeetupSchema)
