//== Profile Page ==============================================================
/*
  [Insert Documentation here]
*/

//-- Dependencies --------------------------------
import Link from 'next/link';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import {
  QUERY_CLIENT_PROFILE,
  QUERY_USER_PROFILE,
  QUERY_FRIENDS_PROFILE,
  QUERY_USERS_PROFILE,
} from '../services/requests/profile';
import UserCard from '../components/Profile/UserCard';
import FriendsList from '../components/Profile/FriendsList';
import UsersDropdown from '../components/Profile/UsersDropdown';
import '../components/Profile/profile.less';

//-- React Implementation ------------------------
export default class extends Component {
  static async getInitialProps({ req }) {
    if (req.url !== undefined) {
      return { userId: req.url.split('id=')[1] };
    }
  }

  render() {
    return (
      <Fragment>
        <div className="profile_pageContainer">
          {/* #region Breadcrumbs */}
          <p className="profile_breadCrumbs">
            <Link href="/">
              <a className="profile_breadCrumbsLink">Home </a>
            </Link>
            >
            <Link href="/profile">
              <a className="profile_breadCrumbsLink"> Profile</a>
            </Link>
          </p>
          {/* #endregion Breadcrumbs end*/}

          <div className="profile_mainContainer">
            <Query query={QUERY_CLIENT_PROFILE}>
              {({ loading: loadingUserId, data: { userId } }) => {
                return (
                  <Fragment>
                    <div className="profile_userCardContainer">
                      {/* #region UserCard component */}
                      <Query
                        query={QUERY_USER_PROFILE}
                        variables={{ id: userId }}
                      >
                        {({ loading: loadingUser, data: { user } }) => {
                          if (loadingUserId || loadingUser) {
                            return <div>Loading</div>;
                          }
                          return <UserCard user={user} />;
                        }}
                      </Query>
                      {/* #endregion UserCard component */}
                    </div>

                    <div className="profile_friendsContainer">
                      {/* #region Userdropdown component */}
                      <Query query={QUERY_USERS_PROFILE}>
                        {({ loading: loadingUsers, data: { users } }) => {
                          if (loadingUserId || loadingUsers) {
                            return <div>Loading</div>;
                          }
                          return (
                            <UsersDropdown userId={userId} users={users} />
                          );
                        }}
                      </Query>
                      {/* #endregion Userdropdown component end */}

                      {/* #region FriendsList component */}
                      <Query
                        query={QUERY_FRIENDS_PROFILE}
                        variables={{ id: userId }}
                      >
                        {({ loading: loadingFriends, data: { friends } }) => {
                          if (loadingUserId || loadingFriends) {
                            return <div>Loading</div>;
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
  }
}
