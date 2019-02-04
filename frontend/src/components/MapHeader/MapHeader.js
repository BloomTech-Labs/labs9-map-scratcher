

//== Map Header ================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import NavigationDropdown from '../Navigation/NavigationDropdown.js';
import FriendDropdown from './FriendDropdown';
import CountryDropdown from './CountryDropdown';
import ViewBordersCheckbox from './ViewBordersCheckbox';
import './mapHeader.scss';

//-- React Implementation ------------------------
export default class MapHeader extends Component {
  render() {
    return (
      <div className="mapHeader_mapHeader">
      <div className="mapHeader_checkboxDesktop">
        <ViewBordersCheckbox />
      </div>
        <FriendDropdown />
        <CountryDropdown />
        <NavigationDropdown logout={this.props.logout} {...this.props} />
      </div>
    );
  }
}
