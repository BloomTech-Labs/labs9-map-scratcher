// NODE MODULES, DEPENDENCIES
// ==============================================
const passport = require('passport')

// PASSPORT MIDDLEWARE
// ==============================================
// server.express is destructured into
// ({ express }) using es6 destructuring syntax
// ==============================================
module.exports = ({ express }) => {
  express.use(passport.initialize())
  express.use(passport.session())
}
