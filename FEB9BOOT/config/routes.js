//Bring in our controller file into this one.
const applicationController = require('../controllers/applicationController');
const autheticationContoller = require('../controllers/authenticationController');

//Let our file know that it should output a
//function that expects our server as a parameter
//and then adds the controllers one by one.
module.exports = function(app) {
  //Takes the routes inside of our controller
  //and puts them inside of our server, we
  //can do this as many times as we want.
  app.use(applicationController);
  app.use(autheticationContoller);
}