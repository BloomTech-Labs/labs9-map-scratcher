// ==================================================
// next-with-apollo -> withApollo: A HOC that allows
// the Apollo Client to work with Next.js (SSR)
// ==================================================
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { viewFriend } from './resolvers';
import { devURL, prodURL } from './config.js';


const defaults = {
  userId: "cjqt5c95y00s40894zs7m6q4v",
  viewingFriend: false,
  friendId: "cjqpxk83t000o0829p7mr6qto",
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
        resolvers: {
          Mutation: {
            viewFriend
          }
        }
      }
    })
);
