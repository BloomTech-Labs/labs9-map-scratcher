import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Dropdown } from 'semantic-ui-react';

import { QUERY_COUNTRIES_HEADER } from '../../services/requests';

export default class CountriesDropdown extends Component {
  render() {
    return (
      <Query query={QUERY_COUNTRIES_HEADER}>
      {({ loading, data: { countries }}) => {
        const countriesList = countries.map(country => {
          return {
            text: country.name,
            value: country.id
          }
        })
        return (
          <Dropdown
            button
            style={{
              zIndex: '10',
              width: '20%',
              background: 'transparent'
            }}
            className="icon"
            floating
            labeled
            icon="world"
            options={countriesList}
            search
            text="Search Countries"
          />
        )
      }}
      </Query>
    )
  }
}
