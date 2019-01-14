import Link from 'next/link';
import React, { Component } from 'react'
import { ApolloConsumer, Query } from 'react-apollo'
import gql from 'graphql-tag'

const USER_QUERY = gql`
  {
    users {
        id
        name
        nickname
        email
    }
  }
`
const isLoggedIn = gql`
  {
    isLoggedIn @client 
  }
`

class Test extends Component {
    render() {
        return (
            <div>
                <p>
                    <Link href="/">
                        <a>Home </a>
                    </Link>
                    >
                    <Link href="/settings">
                        <a> Settings</a>
                    </Link>
                </p>
                {/* Updates state locally, writes directly to the cache. Direct writes are great for one-off mutations that don’t depend on the data that’s currently in the cache, such as writing a single value. */}
                <ApolloConsumer>
                    {() => (
                    <Query query={isLoggedIn}>
                    {({ client, data }) => {
                        console.log(data)
                        return(
                            <button  onClick={() => {
                                data.isLoggedIn === true ? client.writeData({ data: { isLoggedIn: false }}): client.writeData({ data: { isLoggedIn: true } })
                            }}>
                                click
                            </button>
                        )
                    }}
                    </Query>
                    )}
                </ApolloConsumer>
                <div>Test Component</div>
                 {/* query data */}
                <Query query={USER_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const usersToRender = data.users

                    return (
                        <div>
                            {usersToRender.map(user => <div key={user.id}>{user.name} {user.email}</div>)}
                        </div>
                    )

                }}
                </Query>
            </div>
        );
    }
}

export default Test;





