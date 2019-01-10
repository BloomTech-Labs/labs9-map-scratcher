

//==============================================================================

//-- Dependencies --------------------------------
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client')
//------------------------------------------------

const resolvers = {
    Query: {
        info: () => `This is Backpaca`,
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
    typeDefs: './prisma-schema.js',
    resolvers,
    context: { prisma },
});

//-- Start Server ---------------------------------------
server.start(() => console.log(`Server is running on http://localhost:4000`));
