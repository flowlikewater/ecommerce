// Handle data related to user, e.g. signup, signin, email, password, profile, etc.

var router = require('express').Router();
var User = require('../models/user');

// router.post('/signup', function(req, res, next){
//   var user = new User();
//
//   user.profile.name = req.body.name;
//   user.password = req.body.password;
//   user.email = req.body.email;
//
//   user.save(function(err) {
//     if (err) return next (err);
//     res.json('Successfully created a new user');
//     // once saved user on Postman, if successfully saved, display success msg above as html
//   });
// });

router.get('/signup', function(req, res, next) {
  res.render('accounts/signup');
})


router.post('/signup', function(req, res, next) {
  var user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({ email: req.body.email}, function(err, existingUser) {
    // findOne = mongoose method - find one user from the database

    if (existingUser) {
      console.log(req.body.email + "already exists");
      return res.redirect('/signup');
    } else {
      user.save(function(err, user) {
        if (err) return next(err);
        res.json('New user has been created');
      });
    };
  });
});

module.exports = router;
