import React, { Component } from 'react'
import Scatcher from '../Scratcher/index.js'
import { Query } from 'react-apollo'
import { QUERY_COUNTRYID_SCRATCHER, QUERY_USER_SCRATCHER } from '../../services/requests'

export default class Scratcher extends Component {
  
  render() {
    const { countryId, displayId, disabled } = this.props
    let scratchable = !disabled
    return (
      <div style={{height: '200px'}}>
        <Query 
          query={QUERY_COUNTRYID_SCRATCHER}
          variables={{ id: countryId }}>
          {({ loading: loadingCountryCode, data: {countryById} }) => {
            return (
              <Query 
                query={QUERY_USER_SCRATCHER} 
                variables={{ id: displayId }}>
              {({ loading: loadingUserSetting, data: {user} }) => {
                if (loadingCountryCode || loadingUserSetting) return <div>Loading</div>
                if (!disabled && !user.scratchingAutomated) scratchable = true
                return (
                  <Scatcher 
                  scratchable={scratchable}
                  destination={countryById.code} 
                  colorOutline={'cyan'} 
                  colorScratch={'silver'} 
                  handleScratchAll={() => console.log('working')} 
                  handleLoadingError={() => console.log('cannot load image')} 
                  style={{ height: '200px' }} />
                )
              }}
              </Query>
            )
          }}
        </Query>
      </div>
    )
  }
}

// Query country code from countryId props

// props to receive:
//   userType(string) - self or friend, determines if scratcher is scratchable and if visit level and note can be edited
//   countryId(string) - country that was clicked, needed for visit queries
//   userId(string) - user (not necessarily the loggedin user) whose map & country data is being viewed
//   
// props to give:  
//  scratchable(boolean) - What kind of map to display. Options are:
//     True - Display a scratchable map with flag overlay
//     False - Display a simple colored map.
//  destination(string) - An id, usually an ISO 3166-1 Alpha-3 code.
//  colorOutline(string/color) - The map shape is outlined in this color.
//  colorScratch(string/color) - Scratching the image reveals this color.
//  handleScratchAll(function) - A callback to invoke once fully scratched.
//  handleLoadingError(function) - A callback invoked if images can't load.

/* PLEASE NOTE: do not rely on the above when using the Scratcher component.
    Documentation for the Scratcher is in its own index.js file, and the above
    may become out of date as that file changes. */
