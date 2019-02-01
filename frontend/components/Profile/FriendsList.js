

//== Friends List ==============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React from 'react';
import { List, Image, Button, Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { 
  QUERY_FRIENDS_PROFILE,
  MUTATION_DELETEFRIEND_PROFILE,
  MUTATION_FRIEND_PROFILE } from '../../services/requests/profile';
import { Router } from '../../services/routes.js'
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
          <Mutation mutation={MUTATION_FRIEND_PROFILE}>
            {setFriendId => (
              <List.Content onClick={(e, data) => {
                setFriendId({ variables: {id: friend.id}})
                Router.pushRoute('friends', {id: friend.id} )
              }}>
                <Image avatar src='/static/alpaca.png'/>
                {friend.name}
              </List.Content>
            )}
          </Mutation>
          <List.Content>
              <Mutation
                mutation={MUTATION_DELETEFRIEND_PROFILE}
                variables={{userId: userId, friendId: friend.id}}
                update={(cache, {data}) => {
                  const { friends } = cache.readQuery({ query: QUERY_FRIENDS_PROFILE, variables: {id: userId} });
                  const deletedFriend = friend.id
                  cache.writeQuery({
                    query: QUERY_FRIENDS_PROFILE,
                    variables: {id: userId},
                    data: { friends: friends.filter(friend => friend.id !== deletedFriend) },
                  });
                }}
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
