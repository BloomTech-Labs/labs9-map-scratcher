import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const UserDropDown = () => (
  <Dropdown icon='large user'>
    <Dropdown.Menu style={{right: '0', left: 'auto', zIndex: '99999'}}>
      <Dropdown.Item text='Settings' href='/settings' icon='setting' />
      <Dropdown.Item text='Logout' icon='x icon'/>
    </Dropdown.Menu>
  </Dropdown> 
)

export default UserDropDown;