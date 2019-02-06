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
      variables={{ userId: userId, friendId: friendId }}
      update={(cache, {data}) => {
      let result  = cache.readQuery({ query: QUERY_ME_PROFILE });
      const friends = result.me.friends.push({id: friendId});
      result.me.friends = friends;
      console.log(result)
      cache.writeQuery({
        query: QUERY_ME_PROFILE,
        data: { result },
      });
    }}
    >
    {( addFriend, {data} ) => (
      <Button
        className='add'
        fluid
        onClick={() => {
          addFriend({ variables: { userId: userId, friendId: friendId } })
        }}
      >Add friend</Button>
    )}
    </Mutation>
  )
}

export default AddFriendButton;
