// Node restful takes a mongoose model and converts it to a REST
// API (creates all the CRUD operations for you)
var restful = require('node-restful');

// Providing a callback function to pass the app and route of this controller
module.exports = function(app, route) {

  // Setup the controller for REST;
  // Passing the model to restful module
  var rest = restful.model(
    'movie',
    app.models.movie // List of the models from server/models/index.js
  ).methods(['get', 'put', 'post', 'delete']);
  // Giving the movie models the get, put, post, delete functions

  // Register this endpoint with the application
  // (register this API at this route)
  rest.register(app, route);

  // Return middleware.
  // Allows us to inject ourself into a controller (???) 29:40
  return function(req, res, next) {
    next();
  };
};
