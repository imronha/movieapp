// Gives us interface to mongoDB and allows us to provide models to mongoDB.app directly to db.
var mongoose = require('mongoose');

// Create the MovieSchema
// Where we define properties for this object and what type of properties they are.
var MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

// Export the model Schema
// Must always assign component to module.exports
module.exports = MovieSchema;
