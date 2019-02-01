/*== AUTH API ============================================
GET -> /auth/twitter
	Initiate the oauth process.

GET

*/

// NODE MODULES
// ==============================================
const passport = require('passport')

// AUTH ROUTES
// ==============================================
// server.express is destructured into
// ({ express }) using es6 destructuring syntax
// ==============================================
module.exports = ({ express }) => {
  express.get('/auth/twitter', passport.authenticate('twitter'))

  express.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter'),
    (_, res) => {
      if (process.env.NODE_ENV === 'production') {
        res.redirect('https://localhost:3000/test3')
      } else res.redirect('http://localhost:1738/test3')
    }
  )

  express.get('/api/logout', (req, res) => {
    req.logout()
    if (process.env.NODE_ENV === 'production') {
      res.redirect('https://backpaca.now.sh')
    } else res.redirect('http://localhost:1738')
  })

  express.get('/api/current_user', (req, res) => res.send(req.user))
}
