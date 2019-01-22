import gql from 'graphql-tag';
import { QUERY_CLIENT_VIEWFRIEND, QUERY_CLIENT_LOGGED } from './requests';

// export const typeDefs = gql`
//   extend type Query {
//     userId: String
//     viewingFriend: Boolean
//     friendId: String
//     isLoggedIn: Boolean
//   }
// `

export const resolvers = {
  Mutation: {
    viewFriend: (_obj, { id }, {cache}) => {

      const data = {
        viewingFriend: true,
        friendId: id
      };
      cache.writeData({ data });

      const query = QUERY_CLIENT_VIEWFRIEND;
      const currentState = cache.readQuery({ query });
      console.log('the state after', currentState);

      return data;
    },
    toggleLoggedIn: (_obj, args, {cache}) => {
      const query = QUERY_CLIENT_LOGGED;
      const currentState = cache.readQuery({ query });
      console.log(currentState);

      const data = {
        isLoggedIn: !currentState.isLoggedIn
      }
      cache.writeData({data});

      return data;
    }
  }
}
