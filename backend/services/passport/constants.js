

//== Constants Used in Multiple Files ==========================================

/*-- Documentation -------------------------------
  Several constants used in multiple places have been gathered into this file
  so as to provide consistancy, ease of modification, and protection against
  errors.
*/

//-- Define and Export Constants -----------------
const production = (process.env.NODE_ENV === 'production');
module.exports = {
  ROUTE_AUTH_START   : '/auth/twitter',
  ROUTE_AUTH_CALLBACK: '/auth/twitter/callback',
  ROUTE_AUTH_LOGOUT  : '/api/logout',
  ROUTE_AUTH_USER    : '/api/current_user',
  URL_WEBSITE_ROOT: production
  ? 'https://backpaca.now.sh'
  : 'http://localhost:1738',
  URL_AUTH_SUCCESS: production
    ? 'https://backpaca.now.sh/travels'
    : 'http://localhost:1738/travels',
};
