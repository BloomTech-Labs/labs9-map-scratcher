// NODE MODULES, DEPENDENCIES
// ==============================================
const passport = require('passport')
const cookieSession = require('cookie-session')

const keys = require('../../config/keys')

// PASSPORT MIDDLEWARE
// ==============================================
// server.express is destructured into
// ({ express }) using es6 destructuring syntax
// ==============================================
module.exports = ({ express }) => {
  express.use(
    cookieSession({
      name: 'Backpaca',
      key: keys.cookieKey,
      maxAge: 60 * 60 * 1000 // 1 hour
    })
  )
  express.use(passport.initialize())
  express.use(passport.session())
}
