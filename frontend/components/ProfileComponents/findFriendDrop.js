import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import friendOptions from '../MapHeader/friendsOptions.js'

const FindFriends = () => (
    <Dropdown 
    placeholder='Search for friends' 
    search
    selection
    options={friendOptions}
    style={{border: '1px solid blue', height: '20px'}}
    />
)

export default FindFriends