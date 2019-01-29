import React from 'react'
import { QUERY_USER_PROFILE } from '../../services/requests/profile.js'
import { Query } from 'react-apollo';
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
    //list of friends of the logged in user
    data = this.props.friendsData

    
       friends = () => {
            
            let friends = false

            for (let i=0; i<this.data.length; i++) {
                if(this.data[i].id === this.Id) {
                    friends = true
                }
            }

            if(friends === true) {
                return (
                    <a>
                    <Icon name='user'/>
                    12
                    <DeleteFriendButton userId={this.userId} friendId={this.Id} />
                    </a>
                )
            }
            if(friends === false) {
                return (
                    <a>
                    <Icon name='user'/>
                    12
                    <AddFriendButton userId={this.userId} friendId={this.Id} />
                    </a>
                )
            }
        }


    render() {
        return (
        <Query query={QUERY_USER_PROFILE} variables={ {id: this.Id} }>
                {({ loading, data }) => {
                    console.log(data)
                    console.log(`this is current user id ${this.Id}`)
                     if(loading) {
                        return <div>loading...</div>
                    }
                    return (
                    <div>
                        <Card 
                        image='/static/alpaca.png'
                        header='name'
                        meta='friends?'
                        description='TBD, should we add this?'
                        extra={this.friends()}
                        />
                    </div>
                 )
             }}
        </Query>
        )
    }

}
