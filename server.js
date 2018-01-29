var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongo_addr = process.env.MONGO_PORT_27017_TCP_ADDR,
    mongo_port = process.env.MONGO_PORT_27017_TCP_PORT,
    mongoose = require('mongoose'),
    Person = require('./api/models/person'),
    Meetup = require('./api/models/meetup'),
    bodyParser = require('body-parser'),
    cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+mongo_addr+':'+mongo_port+'/youthlivedb');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var people = require('./api/routes/people')
var meetups = require('./api/routes/meetups')
var reports = require('./api/routes/reports')
app.use('/people', people)
app.use('/meetups', meetups)
app.use('/reports', reports)

app.listen(port);

console.log('youthLIVE API server started on: ' + port);
