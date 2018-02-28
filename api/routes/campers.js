var express = require('express');
var router = express.Router();
var campers = require('../controllers/campers');
var credentials = require('../../config/credentials.json');

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // if user is not logged in
    res.redirect('/auth/login');
  } else {
    console.log(credentials.AUTHORIZED_IDS.indexOf(req.user.googleId));
    if (credentials.AUTHORIZED_IDS.indexOf(req.user.googleId) >= 0) next();
    else res.redirect('/auth/login');
  }
};

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now(), ' ', req.url)
  next()
});

// Middleware
router.use(isAuthenticated);

router.route('/')
  .get(campers.get_all_campers)
  .post(campers.add_a_camper);
router.route('/:camperId')
  .get(campers.view_a_camper)
  .put(campers.update_a_camper)
  .delete(campers.delete_a_camper);
router.route('/:camperId/validation')
  .get(campers.set_payment_true);

module.exports = router;
