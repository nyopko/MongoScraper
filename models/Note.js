var mongoose = require("mongoose");

// referencing the Schema constructor
var Schema = mongoose.Schema;

// creating note schema

var NoteSchema = new Schema({
  title: String,
  body: String
});

// creating note model in mongoose
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
