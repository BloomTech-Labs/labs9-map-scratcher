import React, { Component } from 'react'
import { Dropdown, Checkbox } from 'semantic-ui-react'
import friendsOptions from './friendsOptions.js'

export default class MapIndex extends Component {


    render() {
        return (

            <div className='map-header' style={{display:'flex',justifyContent:'space-evenly',alignItems:'center', zIndex: '1000', position: 'absolute', background: 'white', width: '80%', height: '4rem', top: '2.5%', left: '10%', right: '10%'}}>
            <div className='friend-checkbox' style={{display:'flex'}}>
                <Checkbox
                type='checkbox'
                name='showFriendsTravels'
                value=''
                />
                &nbsp;&nbsp;Show Friends' Travels
            </div>
                {/* <h1>My Travels</h1> */}
                <Dropdown
                placeholder='My Travels'
                style={{zIndex: '99999', width: '20%', background: 'transparent'}}
                button
                className='icon'
                floating
                labeled
                icon='users'
                options={friendsOptions}
                search
                 />
                <Dropdown
                button
                style={{zIndex: '99999', width: '20%', background: 'transparent'}}
                className='icon'
                floating
                labeled
                icon='world'
                search
                text='Select Country'
                />
                <Dropdown icon='large user'>
                    <Dropdown.Menu>
                        <Dropdown.Item text='Home' icon='home' href='/' />
                        <Dropdown.Item text='Settings' icon='setting' href='/settings' />
                        <Dropdown.Item text='Logout' icon='sign out' />
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        )
    }
}
