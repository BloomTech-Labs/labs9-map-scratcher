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
        res.redirect('https://backpaca.now.sh/map')
      } else res.redirect('http://localhost:1738/map')

      express.get('/api/logout', (req, res) => {
        req.logout()
        if (process.env.NODE_ENV === 'production') {
          res.redirect('https://backpaca.now.sh')
        } else res.redirect('http://localhost:1738')
      })

      express.get('/api/current_user', (req, res) => res.send(req.user))
    }
  )
}
