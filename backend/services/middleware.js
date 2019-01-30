// NODE MODULES, DEPENDENCIES &
// ==============================================
const passport = require('passport')
const cookieSession = require('cookie-session')
const cors = require('cors')

const keys = require('../config/keys')

const whitelist = ['http://localhost:1738', 'https://backpaca.now.sh']
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
   if (whitelist.indexOf(origin) !== -1 || !origin) {
     callback(null, true)
   } else {
     callback(new Error('Not allowed by CORS'))
   }
 }};

// GLOBAL MIDDLEWARE
// ==============================================
// server.express is destructured into
// ({ express }) using es6 destructuring syntax
// ==============================================
module.exports = ({ express }) => {
  express.use(cors(corsOptions))
  express.options('*', cors(corsOptions));
  express.use(
    cookieSession({
      name: 'Backpaca',
      keys: [keys.cookieKey],
      maxAge: 60 * 60 * 1000 // 1 hour
    })
  )
  express.use(passport.initialize())
  express.use(passport.session())
}
