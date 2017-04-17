var express = require('express');
var morgan = require('morgan');
// morgan logs all requests to the terminal
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
// ejs-mate not working, hyphen screws things up
var User = require('./models/user');
var app = express();

mongoose.connect('mongodb://cho:30101993@ds115870.mlab.com:15870/ecommerce',function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

// middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// in mongodb type of data saved only from x-www-form-urlencoded --> form-data wont work
app.engine('ejs', engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);

// mainroute controlls how the url will look like, e.g. app.use('/batman', mainRoutes) will give you urls like '/batman', and '/batman/about'

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
