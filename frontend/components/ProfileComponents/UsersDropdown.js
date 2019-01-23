import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Query, Mutation } from 'react-apollo';
import { QUERY_USERS_PROFILE } from '../../services/requests';

const UsersDropdown = () => (
  <Query query={QUERY_USERS_PROFILE}>
  {({ loading: loadingUsers, data: { users }}) => {
    const userList = users.map(user => {
      return {
        text: user.name,
        value: user.id
      }
    })
    return(
      <Dropdown
      text='Search for friends'
      search
      selection
      options={userList}
      style={{border: '1px solid blue', height: '20px'}}
      />
    )
  }}
  </Query>
)

export default UsersDropdown;
