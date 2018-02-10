var express = require('express')
var router = express.Router()
var campers = require('../controllers/campers')

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now(), ' ', req.url)
  next()
});

router.route('/')
  .get(campers.get_all_campers)
  .post(campers.add_a_campers)
router.route('/:camperId')
  .get(campers.view_a_camper)
  .put(campers.update_a_camper)
  .delete(campers.delete_a_camper)
router.route('/:camperId/discipler')
  .put(campers.add_a_discipler)
router.route('/:camperId/discipler/:discipleId')
  .delete(campers.add_a_discipler)
router.route('/:camperId/meetups')
  .get(campers.get_camper_meetups)
router.route('/stats/age_demographic')
  .get(campers.get_age_demographic_stats)
router.route('/stats/year_demographic')
  .get(campers.get_year_demographic_stats)
router.route('/stats/age_demographic_d3')
  .get(campers.get_age_demographic_stats_d3)

module.exports = router
