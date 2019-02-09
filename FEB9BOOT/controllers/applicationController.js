//Bring express into the file.
const express = require('express');
//Ask express to provide us with a new
//instance of it's router module.
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

//A simple GET route
router.get('/', isAuthenticated, function(req, res) {
  //Using the handlebars view engine
  //we tell it to render the
  //welcome.hbs view, and give it
  //an object containing a key called
  //username with the value
  //'Your nice name' so that the view can
  //use it.
  res.render('welcome.hbs', {
    username: req.user.firstName
  });
});

//Prepare the file to output our router.
module.exports = router;