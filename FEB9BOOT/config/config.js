const express = require('express');

//Bring in the handlebars middleware for express.
const expresshbs = require('express-handlebars');

//Bring all the contents form the /models
//directory and put it inside a global named
//models.
global.models = require('../models');

//Bring in our passport configuration
const passport = require('./passport');
const session = require('express-session');

module.exports = function(app) {
  //Tells the handlebars middleware
  //to create a new instance of the 
  //view engine
  //defaultLayout: What our main layout
  //file will be called.
  //extname: The extension for our 
  //handlebars files
  let hbs = expresshbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
  });
  
  //Tells our server to use handlebars as
  //our view engine and to expect the
  //handlebars files to be .hbs
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');

  //Sets up the session storage for our application
  app.use(session(
    { 
      secret: "keyboard cat", 
      resave: true, 
      saveUninitialized: true 
    })
  );

  //Let our server know that we'll be using
  //the passport middleware for our authentication
  app.use(passport.initialize());
  app.use(passport.session());

  //Allows our server to receive information from the
  //outside world.
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //Load our routes into the server
  require('./routes')(app);
}