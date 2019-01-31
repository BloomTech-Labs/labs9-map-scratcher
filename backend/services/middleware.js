// NODE MODULES, DEPENDENCIES &
// ==============================================
const passport = require('passport')
const cookieSession = require('cookie-session')
const cors = require('cors')

const keys = require('../config/keys')

const whitelist = ['http://localhost:1738', 'htto://localhost:4000', 'https://backpaca.now.sh']
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
   if (whitelist.indexOf(origin) !== -1 || !origin) {
     console.log('whitelisted domain', origin);
     callback(null, true)
   } else {
     console.log('go away')
     callback(new Error('Not allowed by CORS'))
   }
 }};

// const whitelist = ['http://localhost:1738', 'htto://localhost:4000', 'https://backpaca.now.sh']
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }


// GLOBAL MIDDLEWARE
// ==============================================
// server.express is destructured into
// ({ express }) using es6 destructuring syntax
// ==============================================
module.exports = ({ express }) => {
  express.use(cors(corsOptions))
  // express.post('/', cors(corsOptions));
  express.options('http://localhost:1738', cors(corsOptions));

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
