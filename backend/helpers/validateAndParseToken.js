const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const jwks = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const validateAndParseToken = token => new Promise((resolve, reject) => {
  const { header, payload} = jwt.decode(token, {complete: true});
  if (!header || !header.kid || !payload) {
    reject(new Error('Invalid token'));
  }
  jwks.getSigningKey(header.kid, (err, key) => {
    if (err) {
      reject(new Error('Error getting signing key: ' + err.message));
    };
    jwt.verify(token, key.publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        reject('jwt verify error: ' + err.message);
      };
      resolve(decoded);
    });
  });
});

module.exports = {
  validateAndParseToken,
}
