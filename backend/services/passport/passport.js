

//==============================================================================

/*-- Documentation -------------------------------
  If you understand what this file does, please document it. If you don't,
  please document what little you do understand.
*/

//-- Dependencies --------------------------------
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const keys = require('../../config/keys');
const project = require('./constants.js');

//-- Project Constants ---------------------------
const STRATEGY_OPTIONS = {
  consumerKey: keys.twitterConsumerKey,
  consumerSecret: keys.twitterConsumerSecret,
  callbackURL: project.ROUTE_AUTH_CALLBACK,
  proxy: true,
};

//-- Export Prisma Configuration Function --------
module.exports = async function (prisma) {
  // What does this do?
  passport.serializeUser(function (user, done){
    done(null, user.id);
  });
  passport.deserializeUser(async function (id, done) {
    const user = await prisma.user({ id });
    done(null, user);
  });
  // What is this function?
  async function UNKNOWN_FUNCTION(token, tokenSecret, profile, done) {
    // Try to locate previous user
    const foundUser = await prisma.user({
      twitterHandle: profile.username,
    });
    // If there is none, create one
    if(!foundUser) {
      foundUser = await prisma.createUser({
        twitterHandle: profile.username,
      });
    }
    // Callback with user
    done(null, foundUser);
  }
  // Please document if you know what's going on
  const newStrategy = new TwitterStrategy(STRATEGY_OPTIONS, UNKNOWN_FUNCTION);
  passport.use(newStrategy);
};
