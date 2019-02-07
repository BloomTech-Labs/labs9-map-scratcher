import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo';
import { Card, Button, Dimmer, Loader } from 'semantic-ui-react';
import AddFriendButton from './AddFriendButton.js';
import DeleteFriendButton from './DeleteFriendButton.js';
import './friends.scss'
import {
  QUERY_USER_PROFILE,
  MUTATION_VIEWFRIEND_PROFILE } from '../../services/requests/profile';

export default class FriendCard extends Component {
  constructor(props) {
    super(props);
    this.userId = this.props.currentUserId
    this.friendList = this.props.friendsData
    this.state = { 
      isFriends: false,
      friendId: this.props.match.url.split('/')[2]
    }
  }

  componentDidMount() {
    this.friendList.forEach(friend => {
      if (friend.id === this.state.friendId) {
        this.setState({isFriends: true})
      }
    })
  }

  friendFalse = () => {
    this.setState({isFriends: false})
  }

  friendTrue = () => {
    this.setState({isFriends: true})
  }

  render() {
    return (
      <Query query={QUERY_USER_PROFILE} variables={ {id: this.state.friendId} }>
        {({ loading: loadingUser, data: {user} }) => {
          if (loadingUser) {
            return (
              <Dimmer active>
                <Loader />
              </Dimmer>
            )
          }
          const visitCount = user.visits.length
          return (
            <div>
              <Card
                id='friendCard'
                image={user.pictureUrl ? user.pictureUrl : require('../../static/alpaca.png')}
                header={user.name}
                meta={visitCount === 1 ? `${visitCount} Visit` : `${visitCount} Visits`}
                description={user.bio === null ? null : user.bio}
                extra={ this.state.isFriends ? 
                  (
                    <Fragment>
                      <DeleteFriendButton userId={this.userId} friend={user} toggle={() => this.friendFalse()}/>
                      <Mutation mutation={MUTATION_VIEWFRIEND_PROFILE} variables={{id: user.id, me: this.userId}}>
                        {viewFriend => (
                          <Button fluid onClick={() => {
                            viewFriend()
                            this.props.history.push('/travels')
                          }}>
                            {`View ${user.name}'s Travels`}
                          </Button>
                        )}
                      </Mutation>
                    </Fragment>
                  ) : (
                    <AddFriendButton userId={this.userId} friend={user} toggle={() => this.friendTrue()}/>
                  )
                }
              />
            </div>
          )
        }}
      </Query>
    )
  }
}
