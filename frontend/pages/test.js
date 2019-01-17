import Link from 'next/link';
import React, { Component } from 'react'
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
// import gql from 'graphql-tag'
import {
    USERS_QUERY,
    USER_QUERY,
    COUNTRIES_QUERY,
    COUNTRY_QUERY,
    USERVISITS_QUERY,
    FRIENDS_QUERY,
    FRIENDSVISITS_QUERY
} from '../services/queries';
// import CountryModal from '../components/CountryViewModal/CountryModal.js'

class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            nickname: '',
            email: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }

    render() {
        const id = "cjqt5c95y00s40894zs7m6q4v"
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
                <div>USER</div>
                <Query query={USER_QUERY} variables={{id}}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    return (
                        <div>
                            {<div key={data.user.id}>{data.user.name} {data.user.email}</div>}
                        </div>
                    )
                }}
                </Query>
                <br></br>
                <div>USERS</div>
                <Query query={USERS_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    const usersData = data.users
                    return (
                        <div>
                            {usersData.map(user => <div key={user.id}>{user.name} {user.email}</div>)}
                        </div>
                    )
                }}
                </Query>
                <br></br>
                <div>FRIENDS</div>
                <Query query={FRIENDS_QUERY} variables={{id}}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    const friendsData = data.friends
                    return (
                        <div>
                            {friendsData.map(user => <div key={user.id}>{user.name} {user.email}</div>)}
                        </div>
                    )
                }}
                </Query>
            </div>
        );
    }
}

export default Test;





