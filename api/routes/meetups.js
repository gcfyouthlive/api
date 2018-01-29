var express = require('express')
var router = express.Router()
var meetups = require('../controllers/meetups')

router.use(function timeLog(req, res, next) {
  next()
});

router.route('/')
  .get(meetups.get_all_meetups)
  .post(meetups.add_a_meetup)
router.route('/:meetupId')
  .get(meetups.view_a_meetup)
  .put(meetups.update_a_meetup)
  .delete(meetups.delete_a_meetup)

module.exports = router
