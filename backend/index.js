// NOTE #1 (we should move this but it's fast): i'm using heroku cli to deploy, so from top level
// of repo check to see if the remote comes with it. if not:

// you need heroku client
// `git remote -v` to see if it has the heroku backend or not.
// if you don't see one: `git remote add heroku-backend https://git.heroku.com/backpaca-yoga.git`
// then to push changes `git subtree push --prefix backend heroku-backend master`

//Do this in the backend folder
//export PRISMA_MANAGEMENT_API_SECRET={obtain from heroku} => prisma deploy => prisma generate
//==============================================================================

//-- Dependencies --------------------------------
const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./prisma/generated/prisma-client')

const cors = require('cors')
const { resolvers } = require('./resolvers')
require('./services/passport/passport')(prisma)
//------------------------------------------------
const whitelist = ['http://localhost:1738', 'http://localhost:3000', 'https://backpaca.now.sh']
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

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    }
  }
})

require('./services/middleware')(server)
require('./services/passport/routes')(server)

const opts = {
  cors: corsOptions
}

//-- Start Server ---------------------------------------
server.start(opts, () => console.log(`Server is running on http://localhost:4000`))
