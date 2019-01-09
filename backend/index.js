

//==============================================================================

//-- Dependencies --------------------------------
const { GraphQLServer } = require('graphql-yoga')

//------------------------------------------------
const typeDefs = `
type Query {
    info: String!
    user: [User!]!
}
type User {
    id: ID!
    name: String!
}
`;
let users = [{
    id: '1',
    name: 'Albert Paca',
}];
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        user: () => users,
    },
};
const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

//-- Start Server ---------------------------------------
server.start(() => console.log(`Server is running on http://localhost:4000`));
