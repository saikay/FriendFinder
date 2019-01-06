
var express = require("express");
var path = require("path");
var htmlRouters = express.Router();
// Routes
// Basic route that sends the user first to the AJAX Page

htmlRouters.get("/", function(req, res) {
    //A default, catch-all route that leads to home.html which displays the home page.
    res.sendFile(path.join(__dirname, "../public/home.html"));
    console.log("requested home.html");
});

//A GET Route to /survey which should display the survey page.
htmlRouters.get("/survey",function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
    console.log("requested survey.html");
});

module.exports = htmlRouters;