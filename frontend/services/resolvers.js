import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    userId: String
    viewingFriend: Boolean
    friendId: String
    isLoggedIn: Boolean
  }
`
