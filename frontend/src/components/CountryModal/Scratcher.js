

//== Scratcher =================================================================
/*
  Please add documentation detailing the purpose and use of this component.

  This component is named the same as a component on which it depends, leading
  to possible confusion. Ideally, this should be resolved by providing more
  descriptive names for each component.

  Query country code from countryId props

  props to receive:
    userType(string) - self or friend, determines if scratcher is scratchable and if visit level and note can be edited
    countryId(string) - country that was clicked, needed for visit queries
    userId(string) - user (not necessarily the loggedin user) whose map & country data is being viewed

  props to give:
    scratchable(boolean) - What kind of map to display. Options are:
      True - Display a scratchable map with flag overlay
      False - Display a simple colored map.
    destination(string) - An id, usually an ISO 3166-1 Alpha-3 code.
    colorOutline(string/color) - The map shape is outlined in this color.
    colorScratch(string/color) - Scratching the image reveals this color.
    handleScratchAll(function) - A callback to invoke once fully scratched.
    handleLoadingError(function) - A callback invoked if images can't load.

  PLEASE NOTE: do not rely on the above when using the MapScratcher component.
  Documentation for the MapScratcher is in its own index.js file, and the above
  may become out of date as that file changes.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import ScratchCanvas from '../Scratcher/index.js'
import {
  QUERY_COUNTRYID_SCRATCHER,
  QUERY_USER_SCRATCHER,
  MUTATION_COMPLETE_SCRATCHER } from '../../services/requests/scratcher'

//-- React Implementation ------------------------
export default class Scratcher extends Component {
  render() {
    const { countryId, displayId, disabled } = this.props;
    let scratchable = !disabled;
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
                if (loadingCountryCode || loadingUserSetting) {
                  return <div>Loading</div>
                }
                if (!disabled && !user.scratchingAutomated) {
                  scratchable = true;
                }
                return (
                  <Mutation mutation={MUTATION_COMPLETE_SCRATCHER}>
                    {(scratchingComplete) => (
                      <ScratchCanvas
                      scratchable={scratchable}
                      destination={countryById.code}
                      colorOutline={'lightsteelblue'}
                      colorScratch={'lightsteelblue'}
                      handleScratchAll={() => {
                        scratchingComplete();
                      }}
                      handleLoadingError={(error) => error} 
                      style={{ height: '200px' }} />
                    )}
                  </Mutation>
                );
              }}
              </Query>
            );
          }}
        </Query>
      </div>
    );
  }
}
