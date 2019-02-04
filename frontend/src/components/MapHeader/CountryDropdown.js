

//== Country Drop Down =========================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Dropdown } from 'semantic-ui-react';
import {
  QUERY_COUNTRIES_HEADER,
  MUTATION_OPENMODAL_HEADER } from '../../services/requests/header';

//-- React Implementation ------------------------
export default class CountriesDropdown extends Component {
  render() {
    //query retrieves the list of all countries available to interact with.
    return (
      <Query query={QUERY_COUNTRIES_HEADER}>
      {({ loading, data: { countries }}) => {
        if (loading) {
          return (<div>working on it</div>)
        }
        //retrieves the countries array from the query and maps through it to create the dropdown list data.
        const countriesList = countries.map(country => {
          return {
            text: country.name,
            value: country.id,
          };
        });
        //query returns a mutation that provides the onChange handler for dropdown selection: it writes the value of the selection to the apollo cache and also sets the modalOpen value to true to display the modal.
        return (
          <Mutation mutation={MUTATION_OPENMODAL_HEADER}>
            {(openModal, { data }) => (
              <Dropdown
                onChange={(e, data) => {
                  openModal({ variables: { id: data.value }});
                }}
                button
                className="icon"
                floating
                selectOnBlur={false}
                labeled
                icon="world"
                options={countriesList}
                search
                text="Search Countries"
              />
            )}
          </Mutation>
        );
      }}
      </Query>
    );
  }
}
