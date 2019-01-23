import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Dropdown } from 'semantic-ui-react';

import { QUERY_FRIENDS_HEADER, MUTATION_VIEWINGFRIEND_TRAVELS, QUERY_CLIENT_PROFILE } from '../../services/requests';


export default class FriendDropdown extends Component {
  constructor(props){
    super(props);
  }

  render() {
    //query retrieves the userId from the apollo cache
    return (
      <Query query={QUERY_CLIENT_PROFILE}>
        {({ loading: loadingUserId, data: { userId }}) => {
          //query returns a fragment containing a second query for the user's friend, using the id that was retrieved in the previous query
          return (
            <React.Fragment>
              <Query query={QUERY_FRIENDS_HEADER} variables={{ id: userId }}>
                {({ loading: loadingFriends, data: { friends }}) => {
                  //takes the array of friends retrieved and maps through it to set the value of the dropdown options
                  const friendsList = friends.map(friend => {
                    return {
                      text: friend.name,
                      value: friend.id
                    }
                  })
                  //adds the user to the top of the dropdown options array.
                  friendsList.unshift({ text: 'My Travels', value: userId })
                  //query returns a mutation that checks if the id passed is the same as the user id, and if not sets the apollo cache values for the friend being viewed and the related boolean. 
                  return (
                    <Mutation mutation={MUTATION_VIEWINGFRIEND_TRAVELS}
                    >
                    {(viewFriend, { data }) => (
                      <Dropdown
                        placeholder="My Travels"
                        onChange={(e, data) => {
                          viewFriend({ variables: { id: data.value }});
                        }}
                        style={{
                          zIndex: '10',
                          width: '20%',
                          background: 'transparent'
                        }}
                        button
                        className="icon"
                        floating
                        labeled
                        icon="users"
                        options={friendsList}
                        search
                      />
                    )}
                    </Mutation>
                  )
                }}
              </Query>
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}