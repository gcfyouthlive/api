var express = require('express')
var router = express.Router()
var people = require('../controllers/people')

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now(), ' ', req.url)
  next()
});

router.route('/')
  .get(people.get_all_persons)
  .post(people.add_a_person)
router.route('/:personId')
  .get(people.view_a_person)
  .put(people.update_a_person)
  .delete(people.delete_a_person)
router.route('/:personId/discipler')
  .put(people.add_a_discipler)
router.route('/:personId/discipler/:discipleId')
  .delete(people.add_a_discipler)
router.route('/:personId/meetups')
  .get(people.get_person_meetups)
router.route('/stats/age_demographic')
  .get(people.get_age_demographic_stats)
router.route('/stats/year_demographic')
  .get(people.get_year_demographic_stats)
router.route('/stats/age_demographic_d3')
  .get(people.get_age_demographic_stats_d3)

module.exports = router
