

//== Friends List ==============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import {
  QUERY_FRIENDS_PROFILE,
  MUTATION_DELETEFRIEND_PROFILE,
  MUTATION_FRIEND_PROFILE } from '../../services/requests/profile';
  import { Link } from 'react-router-dom';
  import './profile.scss'

//-- React Implementation ------------------------

  //PROPS - passed from profile.js in pages:
  //friends - friends that the current logged in user has added as a friend.
  //userId - the current user that is logged in
const FriendsList = ({ friends, userId }) => (
  <div className='profile_friendsContainer'>
  <List className='profile_friendsListMain'>
  <List.Header>Your Friends</List.Header>
  {friends.length < 1 && <List.Item><List.Content>You don't have any friends yet! Explore the app to find some!</List.Content></List.Item>}
  {/* Takes friends from props and maps over each friend creating a seperate list item */}
  {friends.map(friend => {
    return (
      <List.Item key={friend.id}>
        <List.Content className='profile_friendsListContent'>
          <Mutation mutation={MUTATION_FRIEND_PROFILE} variables={{id: friend.id}}>
            {setFriendId => (
              <Link
                to={`/friends/${friend.id}`}
                onClick={setFriendId}
              >
                <List.Content>
                  <Image avatar src={friend.pictureUrl ? friend.pictureUrl : require('../../static/alpaca.png')}/>
                  {friend.name}
                </List.Content>
              </Link>
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
  </div>
);
export default FriendsList
