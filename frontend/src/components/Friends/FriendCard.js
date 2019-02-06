import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo';
import { Card, Button } from 'semantic-ui-react';
import AddFriendButton from './AddFriendButton.js';
import DeleteFriendButton from './DeleteFriendButton.js';
import './friends.scss'
import {
  QUERY_USER_PROFILE,
  QUERY_FRIEND_PROFILE,
  MUTATION_VIEWFRIEND_PROFILE } from '../../services/requests/profile';

export default class FriendCard extends Component {

  //the current user that is logged in
  userId = this.props.currentUserId
  //list of friends of the logged in user
  friendList = this.props.friendsData


  friends = (id, name) => {
    let isFriends = false
    if (this.friendList) {
      this.friendList.forEach(friend => {
        if (friend.id === id) {
          isFriends = true
        }
      })
    }

    if(isFriends) {
      return (
        <Fragment>
          <DeleteFriendButton userId={this.userId} friendId={id} />
          <Mutation mutation={MUTATION_VIEWFRIEND_PROFILE} variables={{id: id}}>
            {viewFriend => (
              <Button fluid onClick={() => {
                viewFriend()
                this.props.history.push('/travels')
              }}>
                {`View ${name}'s Travels`}
              </Button>
            )}
          </Mutation>
        </Fragment>
      )
    }

    if(!isFriends) {
      return (
        <AddFriendButton userId={this.userId} friendId={id} />
      )
    }
  }

  render() {
    return (
      <Query query={QUERY_FRIEND_PROFILE}>
        {({ loading: loadingFriendId, data: {friendId} }) => {
          console.log('friendId in friendCard', friendId);
          return (
            <Query query={QUERY_USER_PROFILE} variables={ {id: friendId} }>
              {({ loading: loadingUser, data: {user} }) => {
                  if (loadingFriendId || loadingUser) {
                  return <div>loading...</div>
                }
                console.log(user)
                const visitCount = user.visits.length
                return (
                  <div>
                    <Card
                      id='friendCard'
                      image={user.pictureUrl ? user.pictureUrl : require('../../static/alpaca.png')}
                      header={user.name}
                      meta={visitCount === 1 ? `${visitCount} Visit` : `${visitCount} Visits`}
                      description={user.bio === null ? null : user.bio}
                      extra={this.friends(friendId, user.name)}
                    />
                  </div>
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}
