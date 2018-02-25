var express = require('express')
var router = express.Router()
var campers = require('../controllers/campers')

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now(), ' ', req.url)
  next()
});

router.route('/')
  .get(campers.get_all_campers)
  .post(campers.add_a_camper)
router.route('/:camperId')
  .get(campers.view_a_camper)
  .put(campers.update_a_camper)
  .delete(campers.delete_a_camper)
router.route('/:camperId/validation')
  .get(campers.set_payment_true)
module.exports = router
