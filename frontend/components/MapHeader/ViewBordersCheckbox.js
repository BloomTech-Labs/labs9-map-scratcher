import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { Checkbox } from 'semantic-ui-react'

export default class ViewBordersCheckbox extends Component {
  render() {
    return (
        <div className="mapIndex_friend-checkbox">
          <Checkbox type="checkbox" name="showFriendsTravels" value="" />
          &nbsp;&nbsp;Show Friends' Travels
        </div>
    )
  }
}
