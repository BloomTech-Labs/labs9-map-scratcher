import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    userId: String
    viewingFriend: Boolean
    friendId: String
    isLoggedIn: Boolean
  }
`




export const viewFriend = (_obj, { id }, {cache}) => {
  const query = QUERY_CLIENT_TRAVELS;
  const { currentState } = cache.readQuery({ query });

  const updatedFriend = currentState.friendId(id);

  cache.writeQuery({ query, data: { viewingFriend: true, friendId: updatedFriend}});

  return null;
}
