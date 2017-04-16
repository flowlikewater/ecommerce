var express = require('express');
var morgan = require('morgan');
// morgan logs all requests to the terminal
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user')
var app = express();

mongoose.connect('mongodb://cho:30101993@ds115870.mlab.com:15870/ecommerce',function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.post('/create-user', function(req, res, next){
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;
  user.save(function(err) {
    if (err) next (err);
    res.json('Successfully created a new user');
  })
})

// app.get('/', function(req, res) {
//   // request something from the Server
//   // server responding with something
//   var name = 'kevin'
//   res.json('My name is ' + name)
// });
//
// app.get('/catname', function(req, res) {
//   res.json('batman')
// });

app.listen(3000, function(err) {
  // localhost:3000
  if(err) throw err;
  console.log("Server is Running on port 3000")
});
