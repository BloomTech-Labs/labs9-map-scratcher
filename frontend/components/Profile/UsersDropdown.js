

//== Users Drop Down ===========================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Fragment } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Router } from '../../services/routes.js'
// import { Mutation } from 'react-apollo';
// import { MUTATION_ADDFRIEND_PROFILE } from '../../services/requests/profile';

//-- React Implementation ------------------------

  //PROPS - passed from profile.js in pages:
  //userId - the current user that is logged in
  //users - users in the database which can be added as a friend
const UsersDropdown = ({ userId, users }) => {

  //filter users that are private and have names
  let filtered = users.filter(user => user.isPrivate === false && user.name !== null)

  //Takes users from props and maps over each user 
  const userList = filtered.map(user => {
    return {
      text: user.name,
      value: user.id,
      icon: 'user',
    };
  });

  // console.log(userList)
  return(
    // <Mutation 
    //   mutation={MUTATION_ADDFRIEND_PROFILE}
    // >
    // {(addFriend, {data}) => (
      <Dropdown
      text='Search for friends'
      icon='search'
      search
      selection
      options={userList}
      className='profile_userDropDown'
      // onClick={(e, data) => <Link href={`/friends`} />}
      onChange={(e, data) => {
        Router.pushRoute('friends', {id: data.value} )
      }}
      // onChange={(e, data) => {
      //   addFriend({ variables: { userId: userId, friendId: data.value }});
      // }}
      // onChange={(e, data) => console.log(data.value)}
      // onChange={(e, data) => <Link href={`/friends`} />}
      />
    // )}
    // </Mutation>
  );
}
export default UsersDropdown;
