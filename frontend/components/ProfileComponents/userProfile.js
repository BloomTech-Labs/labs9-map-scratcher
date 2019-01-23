import React from 'react'
import UserCard from './profileCard.js'
import FindFriends from './UsersDropdown.js'
import FriendsList from './friendsList.js'

export default class ProfileCard extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            filler: true,
            name: 'Alpaca',
            joinDate: '2019',
            numFriends: 142,
            automateScratch: null,
            name: 'Aly Paca',
            email: 'alypaca@pacamail.com',
            nickname: 'Aly',
            defaultPicture: '/static/alpaca.png'
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        return(
            <div  style={{display: 'flex', width: '80%', justifyContent: 'space-around'}}>
                <div>
                    <UserCard 
                    name={this.state.name} 
                    joinDate={this.state.joinDate}
                    numFriends={this.state.numFriends}
                    automateScratch={this.props.automateScratch}
                    handleChange={this.handleChange}
                    name={this.state.name}
                    email={this.state.email}
                    nickname={this.state.nickname}
                    profilePicture={this.state.defaultPicture}
                    />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
                <FindFriends />
                <FriendsList
                profilePicture={this.state.defaultPicture}
                />
                </div>
                
            </div>
        )
    }


}