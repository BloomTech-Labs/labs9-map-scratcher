

//== Navigation Dropdown =======================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './nav.scss'

//-- Project Constants ---------------------------


//-- React Implementation ------------------------
export default class NavigationDropdown extends Component {
  render() {
    return (
      <Dropdown floating text="pages" className= 'Nav_dropDown'>
        <Dropdown.Menu className='Nav_menu'>
            <Dropdown.Item 
              text="Travels" 
              icon="plane" 
              className='Nav_item' 
              onClick={() => this.props.history.push('/travels')}
            />
            <Dropdown.Item 
              text="Profile" 
              icon="user" 
              href="/profile" 
              className='Nav_item' 
              onClick={() => this.props.history.push('/profile')}
            />
          <Dropdown.Item text="Logout" icon="sign out" onClick={() => this.props.logout()} className='Nav_item' />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
