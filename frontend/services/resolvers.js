
import gql from 'graphql-tag';
import { QUERY_CLIENT_VIEWFRIEND, QUERY_CLIENT_LOGGED, QUERY_CLIENT_MODAL, QUERY_CLIENT_PROFILE } from './requests';

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
      const query = QUERY_CLIENT_PROFILE;
      const currentState = cache.readQuery({ query });
      let data = {};
      if (currentState.userId === id) {
        data = {
          viewingFriend: false,
          friendId: null,
        }
      } else {
        data = {
          viewingFriend: true,
          friendId: id
        };
      }
      cache.writeData({ data });
      return data;
    },
    toggleLoggedIn: (_obj, args, {cache}) => {
      const query = QUERY_CLIENT_LOGGED;
      const currentState = cache.readQuery({ query });
      const data = {
        isLoggedIn: !currentState.isLoggedIn
      }
      cache.writeData({data});
      return data;
    },
    openModal: (_obj, { id }, {cache}) => {
      const data = {
        modalOpen: true,
        countryId: id
      }
      cache.writeData({ data });
      const query = QUERY_CLIENT_MODAL;
      const currentState = cache.readQuery({ query });
      console.log('openModal', currentState)
      return data;
    },
    closeModal: (_obj, args, {cache}) => {
      const data = {
        modalOpen: false,
        countryId: null
      }
      cache.writeData({ data });
      const query = QUERY_CLIENT_MODAL;
      const currentState = cache.readQuery({ query });
      console.log('closeModal', currentState)
      return data;
    },
  }
}
