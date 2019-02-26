const express = require('express');
const port = process.env.PORT || "3000";
const mongo_addr = process.env.MONGO_PORT_27017_TCP_ADDR || "127.0.0.1";
const mongo_port = process.env.MONGO_PORT_27017_TCP_PORT || "27017";
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
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

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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

app.use('/campers', campers)

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // if user is not logged in
    req.session.lastUrl = req.originalUrl;
    res.redirect('/auth/login');
  } else {
    console.log(credentials.AUTHORIZED_IDS.indexOf(req.user.googleId));
    if (credentials.AUTHORIZED_IDS.indexOf(req.user.googleId) >= 0) next();
    else res.redirect('/auth/login');
  }
};

app.use(isAuthenticated);

// Catch all other routes and return the index file
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port);

console.log('youthLIVE API server started on: ' + port);
