import React from 'react';
import FriendCard from '../components/Friends/FriendCard.js'
import Header from '../components/ProfileHeader/ProfileHeader.js'
import {
  QUERY_ME_PROFILE,
  QUERY_FRIENDS_PROFILE,
  QUERY_USERS_PROFILE } from '../services/requests/profile'
import { Query } from 'react-apollo';

const Friends = (props) => (
  <Query query={QUERY_ME_PROFILE}>
  {({ loading: loadingUser, data: { me } }) => {
    if(loadingUser) {
      return <div>Loading...</div>
    }
    return (
          <Query query={QUERY_USERS_PROFILE}>
          {({ loading: loadingUsers, data: {users} }) => {
            if (loadingUser || loadingUsers) {
              return <div>Loading</div>
            }
            let friends = false;
            if (me.friends) {
              friends = me.friends;
            }
            return (
              <div>
                <Header userId={me.id} users={users} logout={props.logout} {...props} />
                <FriendCard currentUserId={me.id} friendsData={friends} {...props} />
              </div>
            );
          }}
          </Query>
    )
  }}
  </Query>
)

export default Friends
