import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import { 
  MUTATION_ADDFRIEND_PROFILE,
  QUERY_FRIENDS_PROFILE } from '../../services/requests/profile';

const AddFriendButton = ({ userId, friendId }) => {
  return (
    <Mutation 
      mutation={MUTATION_ADDFRIEND_PROFILE}
      update={(cache, {data}) => {
        const { friends } = cache.readQuery({ query: QUERY_FRIENDS_PROFILE, variables: {id: userId} });
        const addedFriend = friendId
        cache.writeQuery({
          query: QUERY_FRIENDS_PROFILE,
          variables: {id: userId},
          data: { friends: friends.concat(addedFriend) },
        });
      }}
    >
    {( addFriend, {data} ) => (
      <Button
        positive
        onClick={() => {
          addFriend({ variables: { userId: userId, friendId: friendId } })
        }}
      >Add friend</Button>
    )}
    </Mutation>
  )
}

export default AddFriendButton;