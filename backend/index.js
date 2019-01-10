

//==============================================================================

//-- Dependencies --------------------------------
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma/generated/prisma-client');
const { resolvers } = require('./resolvers');
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
});

//-- Start Server ---------------------------------------
server.start(() => console.log(`Server is running on http://localhost:4000`));
