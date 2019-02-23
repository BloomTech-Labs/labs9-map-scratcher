export const AUTH_CONFIG = {
  api_audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  callbackUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://backpaca.app/callback',
  issuer: process.env.REACT_APP_AUTH0_ISSUER
}
