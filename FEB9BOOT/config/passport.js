//Bring in passport into the file
const passport = require("passport");
//Bring in the passport-local package, specifically it's Strategy module
const LocalStrategy = require("passport-local").Strategy;

//Set up a new passport instance with our custom local strategy
passport.use(new LocalStrategy(
  //Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email",
  },
  function(email, password, done) {
    //When a user tries to sign in this code runs
    models.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      //If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect Credentials."
        });
      }
      //If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.login(password)) {
        return done(null, false, {
          message: "Incorrect Credentials."
        });
      }
      //If none of the above, the credentials are valid, return the user
      return done(null, dbUser);
    });
  })
);

//Serialize the user into a session string
passport.serializeUser(function(user, callback) {
  callback(null, user);
});

//Process the session string and get the user
passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

//Take out our configured passport instance
module.exports = passport;
