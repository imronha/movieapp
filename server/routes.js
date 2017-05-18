// Assigns a controller to a given route in the app
// => at '/movie' route, load the MovieController
module.exports = {
  '/movie': require('./controllers/MovieController')
};
// Don't forget to register the routes in the server/index.js file
