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
    cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+mongo_addr+':'+mongo_port+'/youthlivedb');

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

app.listen(port);

console.log('youthLIVE API server started on: ' + port);
