

//== Authentication Route Configurer ===========================================

/*-- Documentation -------------------------------
  Exports a function which accepts one arguments, an Express app or router. The
  Express app or router is then configured to expose several routes for
  authentication.
*/

//-- Dependencies --------------------------------
const passport = require('passport');
const project = require('./constants.js');

//-- Utilities -----------------------------------
const auth = passport.authenticate('twitter');

//-- Export Server Configuration Function --------
module.exports = function (expressServer) {
  expressServer.use(passport.initialize());
  expressServer.use(passport.session(   ));
  // Shouldn't some of these 'get' requests be 'post'?
  expressServer.get(project.ROUTE_AUTH_START   , auth                   );
  expressServer.get(project.ROUTE_AUTH_CALLBACK, auth, handleCallback   );
  expressServer.get(project.ROUTE_AUTH_LOGOUT  ,       handleLogout     );
  expressServer.get(project.ROUTE_AUTH_USER    ,       handleCurrentUser);
};


//== Route Handlers ============================================================

//-- Callback ------------------------------------
function handleCallback(request, response) {
  response.redirect(URL_AUTH_SUCCESS);
}

//-- Logout --------------------------------------
function handleLogout(request, response) {
  request.logout();
  response.redirect(project.URL_WEBSITE_ROOT);
}

//-- Get current user-----------------------------
function handleCurrentUser(request, response) {
  return response.send(request.user);
}
