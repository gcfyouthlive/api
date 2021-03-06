var express = require('express');
var router = express.Router();
var campers = require('../controllers/campers');
var credentials = require('../../config/credentials.json');

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

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now(), ' ', req.url)
  next()
});

// Middleware

router.route('/')
  .get(isAuthenticated, campers.get_campers)
  .post(campers.add_a_camper);
router.route('/:camperId')
  .get(isAuthenticated, campers.view_a_camper)
  .put(isAuthenticated, campers.update_a_camper)
  .delete(isAuthenticated, campers.delete_a_camper);
router.route('/:camperId/validation')
  .get(isAuthenticated, campers.set_payment_true);

module.exports = router;
