var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = 3000;

// Initialize Express
var app = express();

// Handlebars 

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-scraper-assignment";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// mongoose.connect("mongodb://localhost/tstscrapeplsignore", { useNewUrlParser: true });

// Routes

// var routes = require("./controller/controller.js");

// app.use("/", routes);

require("./routes/htmlRoutes")(app);


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});