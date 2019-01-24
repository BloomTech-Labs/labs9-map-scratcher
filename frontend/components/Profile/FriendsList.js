import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { MUTATION_DELETEFRIEND_PROFILE } from '../../services/requests';

const FriendsList = ({ friends, userId }) => (
  <List className='profile_friendsListMain'>
  {friends.map(friend => {
    return (
      <List.Item key={friend.id}>
        <Image avatar src='/static/alpaca.png' />
        <List.Content>
          <List.Header as='a'>{friend.name}</List.Header>
          <Mutation
            mutation={MUTATION_DELETEFRIEND_PROFILE}
            variables={{userId: userId, friendId: friend.id}}
          >
          {deleteFriend => (
            <button onClick={deleteFriend}>X</button>
          )}
          </Mutation>
        </List.Content>
      </List.Item>
    )
  })}
  </List>
)

export default FriendsList
