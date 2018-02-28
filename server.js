const express = require('express');
const app = express();
const port = process.env.PORT || "3000";
const mongo_addr = process.env.MONGO_PORT_27017_TCP_ADDR || "127.0.0.1";
const mongo_port = process.env.MONGO_PORT_27017_TCP_PORT || "27017";
const mongoose = require('mongoose');
const Person = require('./api/models/person');
const Camper = require('./api/models/camper');
const Meetup = require('./api/models/meetup');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const User = require('./api/models/user');
const credentials = require('./config/credentials.json');

const auth = require('./api/routes/auth')
const people = require('./api/routes/people')
const campers = require('./api/routes/campers')
const meetups = require('./api/routes/meetups')
const reports = require('./api/routes/reports')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + mongo_addr + ':' + mongo_port + '/youthlivedb', () => {
  console.log('connected to mongodb');
});

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  User.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || credentials.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || credentials.GOOGLE_CLIENT_SECRET,
    callbackURL: credentials.OAUTH_CALLBACK
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log('user is: ', currentUser);
        done(null, currentUser);
      } else {
        new User({
          googleId: profile.id,
          displayName: profile.displayName,
          name: profile.name,
          emails: profile.emails,
          domain: profile.domain
        }).save().then((newUser) => {
          console.log('new user created: ', newUser);
          done(null, newUser);
        });
      }
    });
  })
);

app.set('view engine', 'ejs');
app.use(cookieSession({
  maxAge: 6 * 60 * 60 * 1000,
  keys: ['qwerty']
}));

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', auth);

// app.use('/people', people)
app.use('/campers', campers)
// app.use('/meetups', meetups)
// app.use('/reports', reports)

app.listen(port);

console.log('youthLIVE API server started on: ' + port);
