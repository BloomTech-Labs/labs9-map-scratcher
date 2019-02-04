

//== Apollo Client Setup ====================================================================
/*
  Apollo Client provides the local cache as a single source of truth for the project and is responsible for communicating with the backend. This file configures the way in which it provides those two services.
*/

//-- Dependencies --------------------------------
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { persistCache } from 'apollo-cache-persist';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { resolvers } from './resolvers'
import { devURL, prodURL } from './config.js'

//-- Project Constants ---------------------------
//default values to be initialized to the local cache.
const defaults = {
  // userId: 'cjqt5c95y00s40894zs7m6q4v',
  friendId: null,
  countryId: null,
  viewingFriend: false,
  isLoggedIn: false,
  modalOpen: false,
  viewBorders: false,
  scratchingComplete: false
}
//new local cache, passing in dataIdFromObject, which takes a data object and returns a unique identifier to be used when normalizing the data in ths store.
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

//persist the cache in local storage
// persistCache({
//   cache,
//   storage: window.localStorage,
// });

//sets authorization header to the token stored in local storage after login with Auth0
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``
    }
  }
});

//sets the configuration options for interacting with our backend yoga server
const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === 'development' ? devURL : prodURL,
  credentials: 'include'
});

//sets the configuration options for the local store/cache/state/whatever
const stateLink = withClientState({
  defaults,
  resolvers,
  cache,
});
//initializes Apollo Client. The constants created above are all passed in as configuration options, along with error handling and the project's local resolvers for querying the cache.
const client = new ApolloClient({
  connectToDevtools: true,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors);
      }
      if (networkError) {
        console.log(networkError);
      }
    }),
    stateLink,
    authLink.concat(httpLink),
  ]),
  cache
});

export default client;
