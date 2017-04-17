// Handle data related to user, e.g. signup, signin, email, password, profile, etc.

var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');

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

router.get('/login', function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('accounts/login', {message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('/local-login', {
  // local login is the middleware
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/profile', function(req, res, next) {
  User.findOne({_id: req.user._id}, function(err, user){
    if (err) return next(err);
    res.render('accounts/profile', {user: user});
  });
});

router.get('/signup', function(req, res, next) {
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});


router.post('/signup', function(req, res, next) {
  var user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({ email: req.body.email}, function(err, existingUser) {
    // findOne = mongoose method - find one user from the database

    if (existingUser) {
      req.flash('errors', 'Account with that email address already exists');
      return res.redirect('/signup');
    } else {
      user.save(function(err, user) {
        if (err) return next(err);
        return res.redirect('/');
      });
    }
  });
});

module.exports = router;
