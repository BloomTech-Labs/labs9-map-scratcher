

//== Navigation Dropdown =======================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import Link from 'next/link';
import { Dropdown } from 'semantic-ui-react';
import './nav.less'

//-- Project Constants ---------------------------
// Consider importing this from another file that manages environment logic.
// Dev URL is broken, as port isn't always 4000
const logout =
  (process.env.NODE_ENV === 'production')
    ? 'https://backpaca-yoga.herokuapp.com/api'
    : 'http://localhost:4000/api';

//-- React Implementation ------------------------
export default class NavigationDropdown extends Component {
  render() {
    return (
      <Dropdown floating text="Nav" className= 'Nav_dropDown'>
        <Dropdown.Menu className='Nav_menu'>
          <Link href="/travels">
            <Dropdown.Item text="Travels" icon="plane" className='Nav_item'/>
          </Link>
          <Link href="/profile">
            <Dropdown.Item text="Profile" icon="user" href="/profile" className='Nav_item' />
          </Link>
          <Dropdown.Item text="Logout" icon="sign out" href={`${logout}/logout`} className='Nav_item' />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
