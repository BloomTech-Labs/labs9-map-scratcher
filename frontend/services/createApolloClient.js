// ==================================================
// next-with-apollo -> withApollo: A HOC that allows
// the Apollo Client to work with Next.js (SSR)
// ==================================================
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory'

import { devURL, prodURL } from './config.js';

const defaults = {
  userId: null,
  viewingFriend: false,
  friendId: null,
  isLoggedIn: false
}

const cache = new InMemoryCache();

export default withApollo(
  () =>
    new ApolloClient({
      uri: process.env.NODE_ENV === 'development' ? devURL : prodURL,
      clientState: {
        cache,
        defaults,
      }
    })
);
