export const AUTH_CONFIG = {
  api_audience: process.env.AUTH0_AUDIENCE,
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  callbackUrl: 'http://localhost:1738/callback'
}
