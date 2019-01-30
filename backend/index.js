

//== Backend Server ============================================================

/*-- Documentation -------------------------------
  
  Server, and note on documentation incompleteness:
  This script is used to start the Backpaca backend server. This server provides
  data access to our database through graphQL and a Prisma service. I invite
  anyone who understands this process better than I do to add to this
  documentation.

  Twitter Authentication:
  The various portions of the Twitter authentication result in a "user" object
  being available as a property on requests. I'm unsure if there are any
  requests that for which this object is not available. If you understand this
  process at all, please help to document it. The user object has the following
  properties: [
    name, scratchingAutomated, email, twitterHandle,
    id, isPrivate, isPremium, nickname,
  ]

*/

/*
// NOTE #1 (we should move this but it's fast): i'm using heroku cli to deploy, so from top level
// of repo check to see if the remote comes with it. if not:

// you need heroku client
// `git remote -v` to see if it has the heroku backend or not.
// if you don't see one: `git remote add heroku-backend https://git.heroku.com/backpaca-yoga.git`
// then to push changes `git subtree push --prefix backend heroku-backend master`


//Do this in the backend folder
//export PRISMA_MANAGEMENT_API_SECRET={obtain from heroku} => prisma deploy => prisma generate
*/
//==============================================================================

//-- Dependencies --------------------------------
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma/generated/prisma-client');
const { resolvers } = require('./resolvers');
const configureMiddleware = require('./services/middleware');
const configureAuthentication = require('./services/passport/routes');
const configurePassport = require('./services/passport/passport');

//-- Project Constants ---------------------------
const serverStartMessage = `Server is running on http://localhost:4000`;


//== Create and Configure 'Yoga' Server ========================================

//-- Not sure what this does ---------------------
configurePassport(prisma);

//-- Create Server -------------------------------
const serverConfiguration = { // What does this stuff mean / do?
  typeDefs: './schema.graphql',
  resolvers,
  context: function (request) {
    return {
      ...request,
      prisma,
    };
  },
};
const server = new GraphQLServer(serverConfiguration);
configureMiddleware(server.express);
configureAuthentication(server.express);

//-- Start Server --------------------------------
server.start(() => console.log(serverStartMessage));
