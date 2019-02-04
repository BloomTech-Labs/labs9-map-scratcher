import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import { 
  MUTATION_DELETEFRIEND_PROFILE, 
  QUERY_FRIENDS_PROFILE } from '../../services/requests/profile';

const DeleteFriendButton = ({ userId, friendId }) => {
  return (
    <Mutation 
      mutation={MUTATION_DELETEFRIEND_PROFILE} 
      variables={{ userId: userId, friendId: friendId }}
      update={(cache, {data}) => {
        const { friends } = cache.readQuery({ query: QUERY_FRIENDS_PROFILE, variables: {id: userId} });
        const deletedFriend = friendId
        cache.writeQuery({
          query: QUERY_FRIENDS_PROFILE,
          variables: {id: userId},
          data: { friends: friends.filter(friend => friend.id !== deletedFriend) },
        });
      }}
    >
    {deleteFriend => (
      <Button
        negative
        onClick={deleteFriend}
      >Delete friend</Button>
    )}
    </Mutation>
  )
}

export default DeleteFriendButton;