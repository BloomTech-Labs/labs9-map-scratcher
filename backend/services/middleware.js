

//== Global Middleware Configurer ==============================================

/*-- Documentation -------------------------------
  Exports a function which accepts one arguments, an Express app or router. The
  Express app or router is then configured to use multiple middlewares. The
  purpose of this file is to provide a central location for applying further
  middleware to the server.
*/

//-- Dependencies --------------------------------
const cookieSession = require('cookie-session');
const cors = require('cors');
const keys = require('../config/keys');
const project = require('./passport/constants.js');

//-- Project Constants ---------------------------
const COOKIE_SESSION_NAME = 'Backpaca';
const COOKIE_SESSION_AGE = 60 * 60 * 1000; // 1 hour
const CORS_CREDENTIALS = true;
const CORS_ORIGIN = [project.URL_WEBSITE_ROOT];

//-- Configure server to use middleware ----------
module.exports = function (expressServer) {
  // Cookie Session config
  const cookieSessionOptions = {
    name: COOKIE_SESSION_NAME,
    keys: [keys.cookieKey],
    maxAge: COOKIE_SESSION_AGE,
  };
  expressServer.use(cookieSession(cookieSessionOptions));
  // Cors config
  const corsOptions = {
    credentials: CORS_CREDENTIALS,
    origin: CORS_ORIGIN,
  };
  expressServer.use(cors(corsOptions));
};
