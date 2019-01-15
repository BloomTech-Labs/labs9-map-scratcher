import Link from 'next/link';
import React, { Component } from 'react'
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
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

const createMutation = gql`
    mutation CreateUser($name: String!, $nickname: String!, $email: String!){
        createUser(name: $name, nickname: $nickname, email: $email) {
            name
        }
    }
`

class Test extends Component {

    render() {
        let input;
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
                    {/* add user example */}
                    <Mutation mutation={createMutation}>
                       {( createUser, {data} ) => (
                           <div>
                               <button
                                    onClick={e => {
                                    e.preventDefault();
                                    createUser({ variables: { name: 'input.name', nickname: 'input.nickname', email: 'input.email' } });
                                    }}
                                >
                                add user
                            </button>
                           </div>
                       )}
                    </Mutation>
                    
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




