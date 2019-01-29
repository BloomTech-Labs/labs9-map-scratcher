import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
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
        <a>
            <Icon name='user'/>
            16 friends
            <AddFriendButton userId={this.userId} friendId={this.Id} />
            <DeleteFriendButton userId={this.userId} friendId={this.Id} />
        </a>
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
