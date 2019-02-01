

//== Friend Drop Down ==========================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Dropdown } from 'semantic-ui-react';
import {
  QUERY_CLIENT_HEADER,
  QUERY_FRIENDS_HEADER,
  MUTATION_VIEWFRIEND_HEADER } from '../../services/requests/header';


export default class FriendDropdown extends Component {
  render() {
    //query retrieves the userId from the apollo cache
    return (
      <Query query={QUERY_CLIENT_HEADER}>
        {({ loading: loadingUserId, data: { userId }}) => {
          //query returns a fragment containing a second query for the user's friend, using the id that was retrieved in the previous query
          return (
            <React.Fragment>
              <Query query={QUERY_FRIENDS_HEADER} variables={{ id: userId }}>
                {({ loading: loadingFriends, data: { friends }}) => {
                  //takes the array of friends retrieved and maps through it to set the value of the dropdown options
                  let friendsList = [];
                  if (friends) {
                    friendsList = friends.map(friend => {
                      return {
                        text: friend.name,
                        value: friend.id
                      };
                    });
                  }
                  //adds the user to the top of the dropdown options array.
                  friendsList.unshift({ text: 'My Travels', value: userId });
                  //query returns a mutation that checks if the id passed is the same as the user id, and if not sets the apollo cache values for the friend being viewed and the related boolean.
                  return (
                    <Mutation mutation={MUTATION_VIEWFRIEND_HEADER}
                    >
                    {(viewFriend, { data }) => (
                      <Dropdown
                        placeholder="My Travels"
                        onChange={(e, data) => {
                          viewFriend({ variables: { id: data.value }});
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
        }}
      </Query>
    );
  }
}
