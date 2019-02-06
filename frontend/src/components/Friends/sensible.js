/*
  <FriendCard currentUserId={me.id} friendsData={friends} {...props} />
*/

//== Friend Card ===============================================================
/*
  Please document:
    what this component is
    what it is intended to do
    how to use it
    how it is structured (not as important)
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Card, Button } from 'semantic-ui-react';
import './friends.scss';
import {
  QUERY_ME_PROFILE,
  QUERY_USER_PROFILE,
  QUERY_FRIEND_PROFILE,
  QUERY_FRIENDS_PROFILE,
  MUTATION_VIEWFRIEND_PROFILE,
  MUTATION_ADDFRIEND_PROFILE,
  MUTATION_DELETEFRIEND_PROFILE,
} from '../../services/requests/profile';
const defaultImage = require('../../static/alpaca.png');


//== React Implementation ======================================================

export default class FriendCard extends Component {
  constructor() {
    super(...arguments);
  }
  friends(id, name) {
    // Determine if the queried user is a friend
    let isFriends = false
    if(this.props.friendList) {
      isFriends = this.props.friendList.find(friend => friend.id === id);
    }
    // Display a button to add as a friend
    if(!isFriends) {
      return (
        <a>
          <AddFriendButton userId={this.props.userId} friendId={id} />
        </a>
      )
    }
    // Display a button to remove friend, and one to view their travels
    return (
      <Fragment>
        <a>
          <DeleteFriendButton userId={this.props.userId} friendId={id} />
        </a>
        <Mutation mutation={MUTATION_VIEWFRIEND_PROFILE} variables={{id: id}}>
          {viewFriend => (
            <Button fluid onClick={() => {
              viewFriend()
              this.props.props.history.push('/travels')
            }}>
              {`View ${name}'s Travels`}
            </Button>
          )}
        </Mutation>
      </Fragment>
    );
  }
  render() {
    return (
      <Query query={QUERY_FRIEND_PROFILE}>{responseFriend => {
        // Handle Errors and Loading
        if(responseFriend.loading) {
          return <div>loading...</div>
        }
        // Prep user profile query
        const friendId = responseFriend.data.friendId;
        const variables = {id: friendId};
        return (
          <Query query={QUERY_USER_PROFILE} variables={variables}>{responseUser => {
            // Handle Errors and Loading
            if(responseUser.loading) {
              return <div>loading...</div>
            }
            // Calculate data for Card display
            const user = responseUser.data.user;
            const visitCount = user.visits.length
            const cardMeta = (visitCount === 1 )? `${visitCount} Visit` : `${visitCount} Visits`;
            const cardImage = user.pictureUrl || defaultImage;
            const cardExtra = this.friends(friendId, user.name);
            // Render Card
            return (
              <Card
                id='friendCard'
                image={cardImage}
                header={user.name}
                meta={cardMeta}
                description={user.bio}
                extra={cardExtra}
              />
            );
          }}</Query>
        )
      }}</Query>
    )
  }
}

//== Buttons ===================================================================

//-- React Implementation ------------------------
function AddFriendButton(props) {
  return (
    <Mutation mutation={MUTATION_ADDFRIEND_PROFILE}>
    {(addFriend, response) => {
      console.log('Trying', response)
      if(response.loading) {
        return <Button>LOADING</Button>
      }
      return (
        <Button
          className='add'
          fluid
          onClick={() => {
            addFriend({
              variables: {
                userId: props.userId,
                friendId: props.friendId,
              }
            });
          }}
        >Add friend</Button>
      );
    }}
    </Mutation>
  );
}

//------------------------------------------------
function DeleteFriendButton(props) {
  return (
    <Mutation
      mutation={MUTATION_DELETEFRIEND_PROFILE}
      variables={{ userId: props.userId, friendId: props.friendId }}
      update={(cache, {data}) => {
        const { friends } = cache.readQuery({ query: QUERY_FRIENDS_PROFILE, variables: {id: props.userId} });
        const deletedFriend = props.friendId
        cache.writeQuery({
          query: QUERY_FRIENDS_PROFILE,
          variables: {id: props.userId},
          data: { friends: friends.filter(friend => friend.id !== deletedFriend) },
        });
      }}
    >
    {deleteFriend => (
      <Button
        className='delete'
        fluid
        onClick={deleteFriend}
      >Delete friend</Button>
    )}
    </Mutation>
  )
}
