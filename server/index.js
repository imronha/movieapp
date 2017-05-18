// 1) Declare all objects needed in bootstrap
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// 2) Create the application.
var app = express();

// 3) Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support (allows us to expose our API to all servers
// API is now public and any server can access it)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// // Registering a path '/hello' that uses the callback function
// // We can do this at any time after the app has been defined (var app = express();
// app.use('/hello', function(req, res, next) {
//   res.send('Hello World!');
//   next(); // Gives express the OK to move on to next middleware
// });

// 4) Connect to MongoDB
mongoose.connect('mongodb://localhost/movieapp');
mongoose.connection.once('open', function() {

  // Load the models
  // This dependency injects the models into the controllers
  // Allows controllers to have access to models, but models
  // do not know anything a out controllers (MVC separation)
  app.models = require('./models/index');

  // Load the routes.
  var routes = require('./routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
  });

  console.log('Listening on port 3000...');
  app.listen(3000);
});
