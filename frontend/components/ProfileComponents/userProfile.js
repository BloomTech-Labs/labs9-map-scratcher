import React from 'react'
import UserCard from './profileCard.js'
import FindFriends from './friends.js'

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
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        return(
            <div style={{display: 'flex', width: '80%', justifyContent: 'space-between'}}>
                <UserCard 
                name={this.state.name} 
                joinDate={this.state.joinDate}
                numFriends={this.state.numFriends}
                automateScratch={this.props.automateScratch}
                handleChange={this.handleChange}
                name={this.state.name}
                email={this.state.email}
                nickname={this.state.nickname}
                />
                <FindFriends />
            </div>
        )
    }


}