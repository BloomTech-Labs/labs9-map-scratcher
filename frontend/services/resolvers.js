import gql from 'graphql-tag';
import { QUERY_CLIENT_TRAVELS } from './requests';

// export const typeDefs = gql`
//   extend type Query {
//     userId: String
//     viewingFriend: Boolean
//     friendId: String
//     isLoggedIn: Boolean
//   }
// `



export const viewFriend = (_obj, { id }, {cache}) => {
  const query = QUERY_CLIENT_TRAVELS;
  const currentState = cache.readQuery({ query });
  console.log('the state before', currentState);

  cache.writeData({ data: { viewingFriend: true, friendId: id}});

  const queryTwo = QUERY_CLIENT_TRAVELS;
  const roundTwo = cache.readQuery({ queryTwo });

  console.log('the state after', roundTwo);

  return null;
}
