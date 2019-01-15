import Link from 'next/link';
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

const isLoggedIn = gql`
  {
    isLoggedIn @client 
  }
`

export default () => (
  <div>
    <h1>Backpaca!</h1>
    <div>
      <Link href="/about">
        <a>About </a>
      </Link>
      <Link href="/users">
        <a>Users</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/map">
        <a>Map</a>
      </Link>
      <Link href="/settings">
        <a>Settings</a>
      </Link>
    </div>



    <Query query={isLoggedIn}> 
      {({ client, data }) => {
        return data.isLoggedIn === true ? <div>true</div>:<div>false</div>
      }}

    </Query>
  </div>
);
