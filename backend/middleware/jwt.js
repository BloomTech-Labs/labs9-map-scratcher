/*== JWT MIDDLEWARE ============================================
  Checks the jwt against whe jwks endpoint keys.
*/

// NODE MODULES ==============================================
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

//-- checkJwt --------------------------------
const checkJwt = jwt({
  // Dynamically provide a signing key based on the id in the header and signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 1,
    jwksUri: `https://backpaca.auth0.com/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  credentialsRequired: false,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: process.env.REACT_APP_AUTH0_ISSUER,
  algorithms: [`RS256`]
})

module.exports = { checkJwt }
