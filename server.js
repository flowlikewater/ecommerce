var express = require('express');
var morgan = require('morgan');
// morgan logs all requests to the terminal
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
// ejs-mate not working, hyphen screws things up
var session = require('express-session');
var cookieParser = require('cookie-parser');
// express uses a cookie to store a session id, session id is an encryption signature, on subsequent requests, uses the value of the cookie to retrieve session information stored on the server, this server side storage can be a memory store by default, or can use other data stores like connect-redis npm OR connect-mongo
// session is stored in the server, cookie is stored in the browser
var flash = require('express-flash');
// Flash is an extension of connect-flash with the ability to define a flash message and render it without redirecting the request.
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');
var secret = require('./config/secret');
var User = require('./models/user');
var app = express();


mongoose.connect(secret.database,function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

// middleware - software that acts as a bridge between an operating system or database and applications, especially on a network.
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// in mongodb type of data saved only from x-www-form-urlencoded --> form-data wont work
app.use(cookieParser());
app.use(session({
  resave: true,
  // forces the session to be saved
  saveUninitialized: true,
  // forced the session that is unitialized to be saved to the memory store
  secret: secret.secretKey,
  store: new MongoStore({url: secret.database, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
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

app.listen(secret.port, function(err) {
  // localhost:3000
  if(err) throw err;
  console.log("Server is Running on port " + secret.port)
});
