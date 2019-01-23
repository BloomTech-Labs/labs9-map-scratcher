import React, { Component } from 'react';

import NavigationDropdown from './NavigationDropdown';
import FriendDropdown from './FriendDropdown';
import CountryDropdown from './CountryDropdown';
import ViewBordersCheckbox from './ViewBordersCheckbox';
// import friendsOptions from './friendsOptions.js'
import './mapIndex.less'


export default class MapHeader extends Component {
  render() {
    return (
      <div className="mapIndex_map-header">
        <ViewBordersCheckbox />
        <FriendDropdown />
        <CountryDropdown />
        <NavigationDropdown />
      </div>
    )
  }
}
