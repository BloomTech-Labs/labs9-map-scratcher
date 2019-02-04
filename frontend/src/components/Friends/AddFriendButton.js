import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import {
  QUERY_ME_PROFILE,
  MUTATION_ADDFRIEND_PROFILE,
  QUERY_FRIENDS_PROFILE } from '../../services/requests/profile';

const AddFriendButton = ({ userId, friendId }) => {
  console.log('add friend button props', userId, friendId)
  return (
    <Mutation
      mutation={MUTATION_ADDFRIEND_PROFILE}
      refetchQueries={[{query: QUERY_ME_PROFILE}]}
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
