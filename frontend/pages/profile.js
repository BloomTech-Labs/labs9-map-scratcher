import Link from 'next/link'
import { Fragment } from 'react'
import { Query } from 'react-apollo'
import {
  QUERY_CLIENT_PROFILE,
  QUERY_USER_PROFILE,
  QUERY_FRIENDS_PROFILE,
  QUERY_USERS_PROFILE
} from '../services/requests'
import UserCard from '../components/Profile/UserCard'
import FriendsList from '../components/Profile/FriendsList'
import UsersDropdown from '../components/Profile/UsersDropdown'

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
              <UserCard user={user}/>
            )
          }}
          </Query>
          <Query query={QUERY_FRIENDS_PROFILE} variables={{id: userId}}>
          {({ loading: loadingFriends, data: {friends} }) => {
            if (loadingUserId || loadingFriends) return <div>Loading</div>
            return (
              <FriendsList userId={userId} friends={friends} />
            )
          }}
          </Query>
          <Query query={QUERY_USERS_PROFILE}>
          {({ loading: loadingUsers, data: {users} }) => {
            if (loadingUserId || loadingUsers) return <div>Loading</div>
            return (
              <UsersDropdown userId={userId} users={users} />
            )
          }}
          </Query>
        </Fragment>
      )
    }}
    </Query>
    
  </Fragment>
)
