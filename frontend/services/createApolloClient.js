// ==================================================
// next-with-apollo -> withApollo: A HOC that allows
// the Apollo Client to work with Next.js (SSR)
// ==================================================
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { resolvers } from './resolvers';
import { devURL, prodURL } from './config.js';


const defaults = {
  userId: "cjqt5c95y00s40894zs7m6q4v",
  friendId: null,
  countryId: null,
  viewingFriend: false,
  isLoggedIn: false,
  modalOpen: false,
  viewBorders: false,
  scratchingComplete: false
}

const cache = new InMemoryCache();

export default withApollo(
  () =>
    new ApolloClient({
      uri: process.env.NODE_ENV === 'development' ? devURL : prodURL,
      clientState: {
        cache,
        defaults,
        resolvers,
      }
    })
);
