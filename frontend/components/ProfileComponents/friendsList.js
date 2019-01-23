import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';

import { QUERY_FRIENDS_PROFILE, QUERY_CLIENT_PROFILE } from '../../services/requests';

const FriendsList = (props) => (
  <Query query={QUERY_CLIENT_PROFILE}>
  {({ loading: loadingUserId, data: { userId }}) => {
    return (
      <React.Fragment>
        <Query query={QUERY_FRIENDS_PROFILE} variables={{ id: userId }}>
        {({ loading: loadingFriends, data: { friends }}) => {
          return (
            <List style={{border: '1px solid blue'}}>
            {friends.map(friend => {
              return (
                <List.Item>
                    <Image avatar src={props.profilePicture} />
                    <List.Content>
                        <List.Header as='a'>{friend.name}</List.Header>
                    </List.Content>
                </List.Item>
              )
            })}
            </List>
          )
        }}
        </Query>
      </React.Fragment>
    )
  }}

  </Query>
)

export default FriendsList
