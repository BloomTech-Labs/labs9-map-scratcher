import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Checkbox } from 'semantic-ui-react';
import { QUERY_CLIENT_VIEWFRIEND, MUTATION_TOGGLE_BORDERS } from '../../services/requests';

export default class ViewBordersCheckbox extends Component {
  render() {
    //returns a query to check the apollo cache for the viewingFriend boolean in order to set the proper label
    return (
      <Query query={QUERY_CLIENT_VIEWFRIEND}>
      {({ loading, data}) => {
        let label = "";
        if (data.viewingFriend) {
          //label for when a friend is being viewed.
          label = "Show Your Travels";
        }
        if (!data.viewingFriend) {
          //label for when the user's map is being viewed.
          label="Show Friend's Travels"
        }
        //query returns a mutation that will toggle the viewBorders boolean in the apollo cache. 
        return (
          <Mutation mutation={MUTATION_TOGGLE_BORDERS}>
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
        )
      }}
      </Query>
    )
  }
}
