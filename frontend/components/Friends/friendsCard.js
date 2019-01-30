import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { Card, Icon } from 'semantic-ui-react'
import AddFriendButton from './addFriend.js'
import DeleteFriendButton from './deleteFriend.js'
import { 
  QUERY_USER_PROFILE,
  QUERY_FRIEND_PROFILE } from '../../services/requests/profile'


export default class Friends extends Component {
  constructor(props) {
    super(props)
  }

  //the current user that is logged in
  userId = this.props.currentUserId
  //list of friends of the logged in user
  data = this.props.friendsData

  
  friends = (id) => {   
    let friends = false
    for (let i=0; i<this.data.length; i++) {
      if(this.data[i].id === id) {
        friends = true
      }
    }

    if(friends === true) {
      return (
        <a>
          <Icon name='user'/>
          12
          <DeleteFriendButton userId={this.userId} friendId={id} />
        </a>
      )
    }
    if(friends === false) {
      return (
        <a>
          <Icon name='user'/>
          12
          <AddFriendButton userId={this.userId} friendId={id} />
        </a>
      )
    }
  }

  render() {
    return (
      <Query query={QUERY_FRIEND_PROFILE}>
        {({ loading: loadingFriendId, data: {friendId} }) => {
          return (
            <Query query={QUERY_USER_PROFILE} variables={ {id: friendId} }>
              {({ loading: loadingUser, data: {user} }) => {
                console.log(user)
                  if (loadingFriendId || loadingUser) {
                  return <div>loading...</div>
                }
                return (
                  <div>
                    <Card 
                    image='/static/alpaca.png'
                    header={user.name}
                    meta='number of visits'
                    description={user.bio === null ? null : user.bio}
                    extra={this.friends(friendId)}
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
