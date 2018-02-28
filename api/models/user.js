const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
  googleId: String,
  displayName: String,
  name: {
    givenName: String,
    familyName: String
  },
  emails: [
    {
      value: String,
      type: String
    }
  ],
  domain: String
})

module.exports = mongoose.model('User', UserSchema)
