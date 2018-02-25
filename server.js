var express = require('express'),
  app = express(),
  port = process.env.PORT || "3000",
  mongo_addr = process.env.MONGO_PORT_27017_TCP_ADDR || "127.0.0.1",
  mongo_port = process.env.MONGO_PORT_27017_TCP_PORT || "27017",
  mongoose = require('mongoose'),
  Person = require('./api/models/person'),
  Camper = require('./api/models/camper'),
  Meetup = require('./api/models/meetup'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  credentials = require('./config/credentials.json'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + mongo_addr + ':' + mongo_port + '/youthlivedb');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var people = require('./api/routes/people')
var campers = require('./api/routes/campers')
var meetups = require('./api/routes/meetups')
var reports = require('./api/routes/reports')
app.use('/people', people)
app.use('/campers', campers)
app.use('/meetups', meetups)
app.use('/reports', reports)


//for login persistence
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//setup authentication middleware
passport.use(new GoogleStrategy({
  //Josh you can check the Jasons test credentials in the youthlive google developer account
  clientID: process.env.GOOGLE_CLIENT_ID || credentials.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || credentials.GOOGLE_CLIENT_SECRET,
  callbackURL: credentials.OAUTH_CALLBACK //cannot remain as localhost as I learned this would be api.gcfyouthlive.com/auth/google/callback
},
  function (request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

//Express configurations
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());


//Setup login routes
//this will probably be the login page but putting that here makes the back-end front end so 
//I short circuited the /login page to go to the google login page.
app.get('/login', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

//checks if user is logged in
function ensureAuthenticated(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

app.listen(port);

console.log('youthLIVE API server started on: ' + port);
