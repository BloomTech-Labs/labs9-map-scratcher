import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo';
import { Card, Icon, Button } from 'semantic-ui-react';
import AddFriendButton from './addFriend.js';
import DeleteFriendButton from './deleteFriend.js';
import { Router } from '../../services/routes.js';
import { 
  QUERY_USER_PROFILE,
  QUERY_FRIEND_PROFILE,
  MUTATION_VIEWFRIEND_PROFILE } from '../../services/requests/profile';


export default class Friends extends Component {
  constructor(props) {
    super(props)
  }

  //the current user that is logged in
  userId = this.props.currentUserId
  //list of friends of the logged in user
  data = this.props.friendsData

  
  friends = (id, name) => {   
    let friends = false
    for (let i=0; i<this.data.length; i++) {
      if(this.data[i].id === id) {
        friends = true
      }
    }

    if(friends === true) {
      return (
        <Fragment>
          <a>
            <Icon name='user'/>
            12
            <DeleteFriendButton userId={this.userId} friendId={id} />
          </a>
          <Mutation mutation={MUTATION_VIEWFRIEND_PROFILE} variables={{id: id}}>
            {viewFriend => (
              <Button
              onClick={() => {
                viewFriend()
                // Router.pushRoute('travels')
              }}
            >
              {`View ${name}'s Travels`}
            </Button>
            )}
          </Mutation>
        </Fragment>
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
                  if (loadingFriendId || loadingUser) {
                  return <div>loading...</div>
                }
                return (
                  <div>
                    <Card 
                    image='/static/alpaca.png'
                    header={user.name}
                    meta='number of visits'
                    description='description'
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
