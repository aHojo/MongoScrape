const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
const commentsSchema = new Schema({
  // `body` must be of type String
  body: String
});

// This creates our model from the above schema, using mongoose's model method
const Comments = mongoose.model("Comments", commentsSchema);

// Export the Note model
module.exports = Comments;
