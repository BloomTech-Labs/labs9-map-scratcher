import React, { Fragment } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import { MUTATION_ADDFRIEND_PROFILE } from '../../services/requests';

const UsersDropdown = ({ userId, users }) => {
  const userList = users.map(user => {
    return {
      text: user.name,
      value: user.id,
    }
  })
  return(
    <Mutation 
      mutation={MUTATION_ADDFRIEND_PROFILE}
    >
    {(addFriend, { data }) => (
      <Dropdown
      text='Search for friends'
      search
      selection
      options={userList}
      className='profile_userDropDown'
      onChange={(e, data) => {
        addFriend({ variables: { userId: userId, friendId: data.value }});
      }}
      />
    )}
    </Mutation>
  )
}

export default UsersDropdown;

