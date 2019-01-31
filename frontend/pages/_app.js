//== next/app -> App ===========================================================
/*
  Next.js uses the App component to initialize pages. We wrap ApolloProvider
  accordingly in order to access the ApolloClient from any page.
*/

//-- Dependencies --------------------------------
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import createApolloClient from '../services/createApolloClient.js';

import Meta from '../components/Meta.js';
import '../less/index.less';

//-- React Implementation ------------------------
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { apollo, Component, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Meta />
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

//-- Prep MyApp for Export -----------------------
export default createApolloClient(MyApp);
