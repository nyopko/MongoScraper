var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Creating the article schema

var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Creating the model from the above schema 

var Article = mongoose.model("Article", ArticleSchema);

// Exporting the model model
module.exports = Article;
