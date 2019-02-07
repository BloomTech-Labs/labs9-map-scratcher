import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import {
  QUERY_ME_PROFILE,
  MUTATION_DELETEFRIEND_PROFILE } from '../../services/requests/profile';

const DeleteFriendButton = ({ userId, friend, toggle }) => {
  const friendId = friend.id
  return (
    <Mutation
      mutation={MUTATION_DELETEFRIEND_PROFILE}
      variables={{ userId: userId, friendId: friendId }}
      update={(cache, {data}) => {
        let result = cache.readQuery({ query: QUERY_ME_PROFILE });
        const friends = result.me.friends.filter(friend => friend.id !== friendId);
        result.me.friends = friends; 
        const me = result.me
        cache.writeQuery({
          query: QUERY_ME_PROFILE,
          data: { me },
        });
      }}
      onCompleted={toggle}
    >
    {deleteFriend => (
      <Button
        className='delete'
        fluid
        onClick={deleteFriend}
      >Delete friend</Button>
    )}
    </Mutation>
  )
}

export default DeleteFriendButton;
