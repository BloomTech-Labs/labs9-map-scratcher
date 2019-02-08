

//== Friend Drop Down ==========================================================
/*
  Please add documentation detailing the purpose and use of this component.

  This component is the dropdown menu at the top of the travels page in the
  center of the header bar. It allows the user to select which user's map they
  wish to view.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Dropdown } from 'semantic-ui-react';
import { QUERY_CLIENT_TRAVELS } from '../../services/requests/travels';
import {
  QUERY_MY_FRIENDS_HEADER,
  MUTATION_VIEWFRIEND_HEADER,
} from '../../services/requests/header';


export default class FriendDropdown extends Component {
  render() {
    // Outer query is necessary to determine if we're viewing a friend's travels
    // Inner query retrieves the userId from the apollo cache
    return (
      <Query query={QUERY_CLIENT_TRAVELS}>{responseClientTravels => (
        <Query query={QUERY_MY_FRIENDS_HEADER}>
          {({ loading: loadingFriends, data: { me }}) => {
            if(responseClientTravels.loading || loadingFriends) {
              return (<div>Working on it</div>)
            }
            //takes the array of friends retrieved and maps through it to set the value of the dropdown options
            let friendsList = [];
            if (me.friends) {
              friendsList = me.friends.map(friend => {
                return {
                  text: friend.name,
                  value: friend.id
                };
              });
            }
            //adds the user to the top of the dropdown options array.
            const myTravels = { text: 'My Travels', value: me.id };
            friendsList.unshift(myTravels);
            // Determine the starting value of the Dropdown list
            let defaultTravels = myTravels.value;
            const localState = responseClientTravels.data;
            if(localState.viewingFriend && localState.friendId) {
              defaultTravels = localState.friendId;
            }
            //query returns a mutation that checks if the id passed is the same as the user id, and if not sets the apollo cache values for the friend being viewed and the related boolean.
            return (
              <Mutation mutation={MUTATION_VIEWFRIEND_HEADER}
              >
              {(viewFriend, { data }) => (
                <Dropdown
                  placeholder="My Travels"
                  onChange={(e, data) => {
                    viewFriend({ variables: { id: data.value, me: me.id }});
                  }}
                  button
                  selectOnBlur={false}
                  className="icon"
                  floating
                  labeled
                  icon="users"
                  options={friendsList}
                  search
                  value={defaultTravels}
                />
              )}
              </Mutation>
            );
          }}
        </Query>
      )}</Query>
    );
  }
}
