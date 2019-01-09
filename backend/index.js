

//==============================================================================

//-- Dependencies --------------------------------
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./src/generated/prisma-client')
//------------------------------------------------

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        user: (root, args, context, info) => {
            return context.prisma.users()
        }
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createUser({
                name: args.name
            })
        }
    }
};
const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: { prisma },
});

//-- Start Server ---------------------------------------
server.start(() => console.log(`Server is running on http://localhost:4000`));
