

//== Users Drop Down ===========================================================
/*
  Please add documentation detailing the purpose and use of this component.
  https://www.npmjs.com/package/next-routes 
*/

//-- Dependencies --------------------------------
import React from 'react'
import { Dropdown, Header, Image } from 'semantic-ui-react'
import '../Profile/profile.scss'

//-- React Implementation ------------------------

  //PROPS - passed from profile.js in pages:
  //userId - the current user that is logged in
  //users - users in the database which can be added as a friend
const UsersDropdown = (props) => {

  //filter users that are private and have names
  let filtered = props.users.filter(user => user.isPrivate === false && user.name !== null)
  //Takes users from props and maps over each user 
  const userList = filtered.map(user => {
    return {
      key: user.id,
      text: user.name,
      value: user.id,
      className: 'profile_dropList',
      content: 
        <Header>
          <Image 
            circular
            src={user.pictureUrl ? user.pictureUrl : require('../../static/alpaca.png')}
          />
          {user.name}
        </Header>
    };
  });

  return(
    <Dropdown
      placeholder='Search for friends'
      floating
      search
      selectOnBlur={false}
      icon='search'
      options={userList}
      className='profile_userDropDown'
      onChange={(e, data) => {
        props.history.push(`/friends/${data.value}`)
      }}
    />
  )
}
export default UsersDropdown;
