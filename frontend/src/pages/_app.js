

//== next/app -> App ===========================================================
/*
  Next.js uses the App component to initialize pages. We wrap ApolloProvider
  accordingly in order to access the ApolloClient from any page.
*/

//-- Dependencies --------------------------------
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import createApolloClient from '../services/createApolloClient.js'
import Meta from '../components/Meta.js'
import CurrentUser from '../services/Authentication/CurrentUser.js'
import '../sass/index.scss'

//-- React Implementation ------------------------
class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
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
          <CurrentUser>
            <Component {...pageProps} />
          </CurrentUser>
        </ApolloProvider>
      </Container>
    );
  }
}

//-- Prep MyApp for Export -----------------------
export default createApolloClient(MyApp);
