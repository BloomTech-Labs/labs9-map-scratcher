//NOTE (we should move this but it's fast): i'm using heroku cli to deploy, so from top level of repo check to see if the remote comes with it. if not:

// you need heroku client
// `git remote -v` to see if it has the heroku backend or not.
// if you don't see one: `git remote add heroku-backend https://git.heroku.com/backpaca-yoga.git`
// then to push changes `git subtree push --prefix backend heroku-backend master`

//==============================================================================

//-- Dependencies --------------------------------
const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./prisma/generated/prisma-client')

const { resolvers } = require('./resolvers')
require('./services/passport/passport')(prisma)
//------------------------------------------------

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

require('./services/passport/middleware')(server)
require('./services/passport/routes')(server)

//-- Start Server ---------------------------------------
server.start(() => console.log(`Server is running on http://localhost:4000`))
