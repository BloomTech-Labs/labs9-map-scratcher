

//== View Borders Checkbox =====================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Checkbox } from 'semantic-ui-react';
import {
  QUERY_VIEWFRIEND_HEADER,
  MUTATION_BORDERS_HEADER } from '../../services/requests/header';

//-- React Implementation ------------------------
export default class ViewBordersCheckbox extends Component {


  render() {
    //returns a query to check the apollo cache for the viewingFriend boolean in order to set the proper label
    return (
      <Query query={QUERY_VIEWFRIEND_HEADER}>
      {({ loading, data}) => {
        if (loading) {
          return null; 
        }
        let label = "";
        if (data.viewingFriend) {
          //label for when a friend is being viewed.
          label = "Show Your Travels";
        }
        if (!data.viewingFriend) {
          //label for when the user's map is being viewed.
          label="Show Friend's Travels";
        }
        //query returns a mutation that will toggle the viewBorders boolean in the apollo cache.
        return (
          <Mutation mutation={MUTATION_BORDERS_HEADER}>
          {(toggleBorders, { data }) => (
            <div className="mapIndex_friend-checkbox">
              <Checkbox
              type="checkbox" name="showFriendsTravels"
              value=""
              onChange={toggleBorders}
              label={label}
              />
            </div>
          )}
          </Mutation>
        );
      }}
      </Query>
    );
  }
}
