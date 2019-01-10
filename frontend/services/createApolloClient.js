// ==================================================
// next-with-apollo -> withApollo: A HOC that allows
// the Apollo Client to work with Next.js (SSR)
// ==================================================
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

import { devURL, prodURL } from './config.js';

export default withApollo(
  () =>
    new ApolloClient({
      uri: process.env.NODE_ENV === 'development' ? devURL : prodURL
    })
);
