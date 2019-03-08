//dependencies
var express = require('express');
var router = express.Router();
var path = require('path');
var logger = require("morgan");
var mongoose = require("mongoose");


var db = require("../models");

//require request and cheerio to scrape
var axios = require("axios");
var cheerio = require('cheerio');

//Require models
var Note = require('../models/Note.js');
var Article = require('../models/Article.js');

router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.ign.com/articles").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $(".listElmnt-blogItem").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(element).children(".listElmnt-storyHeadline").text();
        result.link = $(element).children(".listElmnt-storyHeadline").attr("href");
        result.blurb = $(element).children("p").text();
  
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });
  
  // Route for getting all Articles from the db
  router.get("/articles", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find({}).
    then((dbArticle) => {
      res.json(dbArticle);
    }).
    catch((err) => {
      res.json(err);
    });
  });
  
  // Route for grabbing a specific Article by id, populate it with it's note
  router.get("/articles/:id", function(req, res) {
    let id = req.params.id;
    // TODO
    // ====
    // Finish the route so it finds one article using the req.params.id,
    // and run the populate method with "note",
    // then responds with the article with the note included
    db.Article.findById(
      id
    ).
    populate('note').
    then((dbArticle) => {
      res.json(dbArticle);
    }).
    catch((err) => {
      res.json(err);
    });
  });
  
  // Route for saving/updating an Article's associated Note
  router.post("/articles/:id", function(req, res) {
  
  
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id
    // and update it's "note" property with the _id of the new note
    let id = req.params.id;
  
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If saved successfully, send the the new note document to the client
        return db.Article.findByIdAndUpdate(id, { $push: {
          note: dbNote._id } }, { new: true });
        })
        .then(function(dbUser) {
          res.json(dbUser);
        })
      .catch(function(err) {
        // If an error occurs, send the error to the client
        res.json(err);
      });
  
  
  });

  module.exports = router;
  