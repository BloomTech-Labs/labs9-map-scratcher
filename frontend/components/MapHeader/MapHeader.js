import React, { Component } from 'react';
import NavigationDropdown from './NavigationDropdown';
import FriendDropdown from './FriendDropdown';
import CountryDropdown from './CountryDropdown';
import ViewBordersCheckbox from './ViewBordersCheckbox';
import './mapHeader.less'


export default class MapHeader extends Component {
  render() {
    return (
      <div className="mapHeader_mapHeader">
      <div className="mapHeader_checkboxDesktop">
        <ViewBordersCheckbox />
      </div>
        <FriendDropdown />
        <CountryDropdown />
        <NavigationDropdown />
      </div>
    )
  }
}
