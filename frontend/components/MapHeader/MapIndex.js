import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Dropdown, Checkbox } from 'semantic-ui-react'

import { FRIENDS_QUERY, COUNTRIES_QUERY } from '../../services/queries'
import MapDropdown from './MapDropdown'
import friendsOptions from './friendsOptions.js'

export default class MapIndex extends Component {
  handleError(error) {
    return <div>Error</div>
  }
  handleLoading(loading) {
    return <div>Loading</div>
  }

  render() {
    const id = 'cjqt5c95y00s40894zs7m6q4v'
    return (
      <div
        className="map-header"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          zIndex: '1000',
          position: 'absolute',
          background: 'white',
          width: '80%',
          height: '4rem',
          top: '2.5%',
          left: '10%',
          right: '10%'
        }}
      >
        <div className="friend-checkbox" style={{ display: 'flex' }}>
          <Checkbox type="checkbox" name="showFriendsTravels" value="" />
          &nbsp;&nbsp;Show Friends' Travels
        </div>
        {/* <h1>My Travels</h1> */}
        <Query query={FRIENDS_QUERY} variables={{ id }}>
          {response => {
            let error = response.error
            let loading = response.loading

            const dropdownData = response.data.friends.map(friend => {
              return { text: friend.name, value: friend.id }
            })

            if (loading) {
              return this.handleLoading(loading)
            }

            if (error) {
              return this.handleError(error)
            }
            return (
              <Dropdown
                placeholder="My Travels"
                style={{
                  zIndex: '99999',
                  width: '20%',
                  background: 'transparent'
                }}
                button
                className="icon"
                floating
                labeled
                icon="users"
                options={dropdownData}
                search
              />
            )
          }}
        </Query>
        <Query query={COUNTRIES_QUERY}>
          {response => {
            let error = response.error
            let loading = response.loading

            const countries = response.data.countries.map(country => {
              return { text: country.name, value: country.id }
            })

            if (loading) {
              return this.handleLoading(loading)
            }

            if (error) {
              return this.handleError(error)
            }
            return (
              <Dropdown
                button
                style={{
                  zIndex: '99999',
                  width: '20%',
                  background: 'transparent'
                }}
                className="icon"
                floating
                labeled
                icon="world"
                options={countries}
                search
                text="Search Countries"
              />
            )
          }}
        </Query>
        <MapDropdown />
      </div>
    )
  }
}
