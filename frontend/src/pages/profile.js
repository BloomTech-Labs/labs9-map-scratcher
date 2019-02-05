

//== Profile Page ==============================================================
/*
  [Insert Documentation here]
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import {
  QUERY_USERS_PROFILE,
  QUERY_ME_PROFILE
} from '../services/requests/profile';
import { Dimmer, Loader } from 'semantic-ui-react';
import UserCard from '../components/Profile/UserCard';
import Header from '../components/ProfileHeader/ProfileHeader';
import FriendsList from '../components/Profile/FriendsList';
import '../components/Profile/profile.scss';

//-- React Implementation ------------------------

export default class Profile extends Component {

  render() {
    return (
      <Fragment>
        <div className='profile_pageContainer'>
          <div className='profile_mainContainer'>
            <div className='profile_userCardContainer'>

            {/* #region UserCard component */}
              <Query query={QUERY_ME_PROFILE} >
              {({ loading: loadingUser, error, data: { me } }) => {
                if (loadingUser) {
                  return (
                    <Dimmer active>
                      <Loader />
                    </Dimmer>
                  )
                }
                if (error) {
                  return <div>Whoops!</div>
                }
                console.log('in profile', me)
                return (
                  <Fragment>
                  {/* #region Header component */}
                    <Query query={QUERY_USERS_PROFILE}>
                    {({ loading: loadingUsers, data: {users} }) => {
                      if (loadingUser || loadingUsers) {
                        return (
                          <Dimmer active>
                            <Loader />
                          </Dimmer>
                        )
                      }
                      return (
                        <Header userId={me.id} users={users} logout={this.props.logout} {...this.props}/>
                      );
                    }}
                    </Query>
                  {/* #endregion Header component end */}
                  <UserCard user={me} {...this.props}/>
                  {/* #region FriendsList component */}
                  <FriendsList userId={me.id} friends={me.friends} />
                  {/* #endregion FriendsList component */}
                  </Fragment>
                );
              }}
              </Query>
            {/* #endregion UserCard component */}

            </div>
          </div>
        </div>
      </Fragment>
    );

  }
}
