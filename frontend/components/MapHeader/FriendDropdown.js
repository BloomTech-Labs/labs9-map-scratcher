import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Dropdown } from 'semantic-ui-react';

import { QUERY_FRIENDS_HEADER, MUTATION_VIEWINGFRIEND_TRAVELS, QUERY_CLIENT_PROFILE } from '../../services/requests';


export default class FriendDropdown extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Query query={QUERY_CLIENT_PROFILE}>
        {({ loading: loadingUserId, data: { userId }}) => {
          return (
            <React.Fragment>
              <Query query={QUERY_FRIENDS_HEADER} variables={{ id: userId }}>
                {({ loading: loadingFriends, data: { friends }}) => {
                  const friendsList = friends.map(friend => {
                    return {
                      text: friend.name,
                      value: friend.id
                    }
                  })
                  friendsList.unshift({ text: 'My Travels', value: userId })
                  return (
                    <Mutation mutation={MUTATION_VIEWINGFRIEND_TRAVELS}>
                    {(viewFriend, { data }) => (
                      <Dropdown
                        placeholder="My Travels"
                        onChange={(e, data) => {
                          viewFriend({ variables: {id: data.value }});
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
