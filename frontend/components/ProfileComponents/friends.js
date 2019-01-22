import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import friendOptions from '../MapHeader/friendsOptions.js'

const FindFriends = () => (
    <Dropdown 
    placeholder='Select Friend' 
    selection
    options={friendOptions}
    style={{border: '1px solid blue', height: '20px', width: '20%'}}
    />
)

export default FindFriends