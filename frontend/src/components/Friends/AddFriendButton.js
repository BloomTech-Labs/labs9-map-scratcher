import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import {
  QUERY_ME_PROFILE,
  MUTATION_ADDFRIEND_PROFILE } from '../../services/requests/profile';

const AddFriendButton = ({ userId, friend, toggle }) => {
  return (
    <Mutation
      mutation={MUTATION_ADDFRIEND_PROFILE}
      variables={{ userId: userId, friendId: friend.id }}
      update={(cache, {data}) => {
        let result  = cache.readQuery({ query: QUERY_ME_PROFILE });
        result.me.friends.push(friend);
        const me = result.me
        cache.writeQuery({
          query: QUERY_ME_PROFILE,
          data: { me },
        });
      }}
      onCompleted={toggle}
    >
    {( addFriend, {data} ) => (
      <Button
        className='add'
        fluid
        onClick={() => {
          addFriend({ variables: { userId: userId, friendId: friend.id } })
        }}
      >Add friend</Button>
    )}
    </Mutation>
  )
}

export default AddFriendButton;
