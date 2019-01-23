import Link from 'next/link'
import Settings from '../components/Settings/settings.js'
import { Query, Mutation } from 'react-apollo'
import { Fragment } from 'react'
import {
  QUERY_CLIENT_PROFILE,
  QUERY_USER_PROFILE,
  QUERY_FRIENDS_PROFILE,
  QUERY_USERS_PROFILE,
  MUTATION_DELETEFRIEND_PROFILE
} from '../services/requests'

import ProfileCard from '../components/ProfileComponents/userProfile.js'


export default () => (
  <Fragment>
    <p>
      <Link href="/">
        <a>Home </a>
      </Link>
      >
      <Link href="/profile">
        <a> Profile</a>
      </Link>
    </p>
    <Query query={QUERY_CLIENT_PROFILE}>
    {({ loading: loadingUserId, data: {userId} }) => {
      return (
        <Fragment>
          <Query query={QUERY_USER_PROFILE} variables={{id: userId}}>
          {({ loading: loadingUser, data: {user} }) => {
            if (loadingUserId || loadingUser) return <div>Loading</div>
            return (
              <div>{user.name}</div>
            )
          }}
          </Query>
          <Query query={QUERY_FRIENDS_PROFILE} variables={{id: userId}}>
          {({ loading: loadingFriends, data: {friends} }) => {
            if (loadingUserId || loadingFriends) return <div>Loading</div>
            return (
              <div>
                {
                friends.map(friend => {
                  return (
                    <div>
                      <span key={friend.id}>{friend.name}</span>
                      <Mutation
                        mutation={MUTATION_DELETEFRIEND_PROFILE}
                        variables={{userId: userId, friendId: friend.id}}
                      >
                        {deleteFriend => (
                          <button onClick={deleteFriend}>
                            Click plz
                          </button>
                        )}
                      </Mutation>
                    </div>
                  )
                })
                }
              </div>
            )
          }}
          </Query>
        </Fragment>
      )
    }}
    </Query>
    <Query query={QUERY_USERS_PROFILE}>
    {({ loading, data: {users} }) => {
      if (loading) return <div>Loading</div>
      return (
        <div>{users.map(user => <div key={user.id}>{user.name}</div>)}</div>
      )
    }}
    </Query>
    <Settings />
     <ProfileCard />
  </Fragment>
    <ProfileCard />
  </div>
)
