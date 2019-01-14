import Link from 'next/link';
import React, { Component } from 'react'
import { Query } from 'react-apollo'
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

export default Test