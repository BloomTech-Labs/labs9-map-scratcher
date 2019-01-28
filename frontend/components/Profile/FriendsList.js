

//== Friends List ==============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React from 'react';
import { List, Image, Button, Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { MUTATION_DELETEFRIEND_PROFILE } from '../../services/requests/profile';
import './profile.less'

//-- React Implementation ------------------------

  //PROPS - passed from profile.js in pages:
  //friends - friends that the current logged in user has added as a friend.
  //userId - the current user that is logged in
const FriendsList = ({ friends, userId }) => (
  <List className='profile_friendsListMain'>

  {/* Takes friends from props and maps over each friend creating a seperate list item */}
  {friends.map(friend => {
    return (
      <List.Item key={friend.id}>
        <List.Content className='profile_friendsListContent'>
          <List.Content>
            <Image avatar src='/static/alpaca.png'/>
              {friend.name}
          </List.Content>
          <List.Content>
              <Mutation
                mutation={MUTATION_DELETEFRIEND_PROFILE}
                variables={{userId: userId, friendId: friend.id}}
              >
              {deleteFriend => (
                <List.Icon name='user delete' onClick={deleteFriend} className='profile_friendsListIcon' />
              )}
              </Mutation>
          </List.Content>
        </List.Content>
      </List.Item>
    );
  })}
  </List>
);
export default FriendsList
