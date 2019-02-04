

//== Friend Drop Down ==========================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Dropdown } from 'semantic-ui-react';
import {
  QUERY_MY_FRIENDS_HEADER,
  MUTATION_VIEWFRIEND_HEADER } from '../../services/requests/header';


export default class FriendDropdown extends Component {
  render() {
    //query retrieves the userId from the apollo cache
    return (
      <React.Fragment>
        <Query query={QUERY_MY_FRIENDS_HEADER}>
          {({ loading: loadingFriends, data: { me }}) => {
            if (loadingFriends) {
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
            friendsList.unshift({ text: 'My Travels', value: me.id });
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
                />
              )}
              </Mutation>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
