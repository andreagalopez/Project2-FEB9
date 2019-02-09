var db = require("../models");

module.exports = function(app) {

  // Load index page
  app.get("/", function(req, res) {
    db.Guest.findAll({}).then(function(dbGuests) {
      res.render("login", {
        guests: dbGuests
      });
    });
  });
  
  app.get("/index", function(req, res){
    res.render("index");
  });

  app.get("/signup", function (req, res) {
    console.log(req.body);
    res.render("signup");
  });

  app.post("/signup", function(req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.post("/index", function(req, res) {
    db.Events.create({
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      place: req.body.place,
      UserId: 2
    }).then(function() {
      res.redirect(307, "/");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  
  /*Get events into the main panel */
  app.get('/panel', function(req, res) {
    db.Events.findAll({
      where: {UserId: 2}
    }).then(function(dbEvents) {
      console.log(dbEvents);
      res.render("panelcontrol", {
        invitedEvents: dbEvents
      });
    })
  });

  // Load control panel
  app.get("/control_panel", function(req, res) {
    res.render("control_panel");
  });
};
