import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { QUERY_FRIENDS_PROFILE } from '../../services/requests/profile.js'
import { Query } from 'react-apollo';
import AddFriendButton from './addFriend.js'
import DeleteFriendButton from './deleteFriend.js'

export default class Friends extends React.Component {
    constructor(props) {
        super(props)
    }

    //the ID of the user's page they are on
    Id = this.props.id
    //the current user that is logged in
    userId = this.props.currentUserId

    numFriends = (
        <Query query={QUERY_FRIENDS_PROFILE} variables={{id: this.userId}}> 
        {({ loading, data }) => {

            if(loading) {
                return <div>loading...</div>
            }

            let friends = false

            for (let i=0; i<data.friends.length; i++) {
                if(data.friends[i].id === this.Id) {
                    friends = true
                }
            }

            console.log(`current user ${this.userId}`)
            console.log(`current profile ${this.Id}`)
            console.log(data.friends)
            console.log(`find user ${friends}`)

            if(friends === true) {
                return (
                    <a>
                    <Icon name='user'/>
                    16 friends
                    <DeleteFriendButton userId={this.userId} friendId={this.Id} />
                    </a>
                )
            }
            if(friends === false) {
                return (
                    <a>
                    <Icon name='user'/>
                    16 friends
                    <AddFriendButton userId={this.userId} friendId={this.Id} />
                    </a>
                )
            }
        }}
        </Query>
    )


    render() {
        return (
            <div>
                <Card 
                image='/static/alpaca.png'
                header={this.userId}
                meta='friends?'
                description='TBD, should we add this?'
                extra={this.numFriends}
                />
            </div>
        )
    }

}
