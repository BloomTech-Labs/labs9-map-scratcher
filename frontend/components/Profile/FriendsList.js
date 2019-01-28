

//== Friends List ==============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { 
  MUTATION_DELETEFRIEND_PROFILE,
  QUERY_FRIENDS_PROFILE } from '../../services/requests/profile';

//-- React Implementation ------------------------
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
            update={(cache, {data}) => {
              const { friends } = cache.readQuery({ query: QUERY_FRIENDS_PROFILE, variables: {id: userId} });
              const deletedFriend = friend.id
              cache.writeQuery({
                query: QUERY_FRIENDS_PROFILE,
                variables: {id: userId},
                data: { friends: friends.filter(friend => friend.id !== deletedFriend) },
              });
            }}
          >
          {deleteFriend => (
            <button onClick={deleteFriend}>X</button>
          )}
          </Mutation>
        </List.Content>
      </List.Item>
    );
  })}
  </List>
);
export default FriendsList
