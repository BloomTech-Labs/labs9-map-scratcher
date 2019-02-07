

//== Map Header ================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import NavigationDropdown from '../Navigation/NavigationDropdown';
import UserDropdown from './UserDropdown';
import './ProfileHeader.scss';

//-- React Implementation ------------------------
export default class MapHeader extends Component {

  render() {
    return (
      <div className="Profile_profileHeader">
        {/* Logo in place of backpaca */}
        <div className='logo'>
        <img src='https://files.slack.com/files-pri/T4JUEB3ME-FG0C50JFK/slider_thumb.png' alt='logo alpaca'/>
        <p>
        Backpaca
        </p>
        </div>
        <UserDropdown userId={this.props.userId} users={this.props.users} {...this.props} />
        <NavigationDropdown logout={this.props.logout} {...this.props} />
      </div>
    );
  }
}
