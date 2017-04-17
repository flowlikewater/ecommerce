// Handling main routes like home, product, cart and search routes

var router = require('express').Router();
// Router method is coming from express

router.get('/', function(req, res) {
  res.render('main/home');
  // this refers to home.ejs
});

//router is a subpath of a certian route

router.get('/about', function(req, res) {
  res.render('main/about');
});

module.exports = router;
