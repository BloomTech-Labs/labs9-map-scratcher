

//== Profile Page ==============================================================
/*
  [Insert Documentation here]
*/

//-- Dependencies --------------------------------
import { Fragment } from 'react'
import { Query } from 'react-apollo'
import {
  QUERY_CLIENT_PROFILE,
  QUERY_USER_PROFILE,
  QUERY_FRIENDS_PROFILE,
  QUERY_USERS_PROFILE
} from '../services/requests/profile'
import UserCard from '../components/Profile/UserCard'
import Header from '../components/ProfileHeader/ProfileHeader.js'
import FriendsList from '../components/Profile/FriendsList.js'
import '../components/Profile/profile.less'

//-- React Implementation ------------------------
export default () => (
  <Fragment>
    <div className='profile_pageContainer'>
      <div className='profile_mainContainer'>
        <Query query={QUERY_CLIENT_PROFILE}>
        {({ loading: loadingUserId, data: {userId} }) => {
          return (
            <Fragment>
              <div className='profile_userCardContainer'>

              {/* #region UserCard component */}
                <Query query={QUERY_USER_PROFILE} variables={{id: userId}}>
                {({ loading: loadingUser, data: {user} }) => {
                  if (loadingUserId || loadingUser) {
                    return <div>Loading</div>
                  }
                  return (
                    <UserCard user={user}/>
                  );
                }}
                </Query>
              {/* #endregion UserCard component */}

              </div>

              <div className='profile_friendsContainer'>

              {/* #region Header component */}
                <Query query={QUERY_USERS_PROFILE}>
                {({ loading: loadingUsers, data: {users} }) => {
                  if (loadingUserId || loadingUsers) {
                    return <div>Loading</div>
                  }
                  return (
                    <Header userId={userId} users={users} />
                  );
                }}
                </Query>
              {/* #endregion Header component end */}

              {/* #region FriendsList component */}
                <Query query={QUERY_FRIENDS_PROFILE} variables={{id: userId}}>
                {({ loading: loadingFriends, data: {friends} }) => {
                  if (loadingUserId || loadingFriends) {
                    return <div>Loading</div>
                  }
                  return (
                    <FriendsList userId={userId} friends={friends} />
                  );
                }}
                </Query>
              {/* #endregion FriendsList component */}
              </div>
            </Fragment>
          );
        }}
        </Query>
      </div>
    </div>
  </Fragment>
);
