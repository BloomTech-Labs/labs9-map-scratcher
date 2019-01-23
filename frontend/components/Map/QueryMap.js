import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { QUERY_CLIENT_TRAVELS, QUERY_USERVISITS_TRAVELS, QUERY_FRIENDSVISITS_TRAVELS, QUERY_CLIENT_MODAL } from '../../services/requests.js';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { fixData } from './mapHelpers';

// const DynamicMap = dynamic(() => import('../components/Map/QueryMap'), {
//   loading: () => (
//     <Dimmer active>
//       <Loader size="large" />
//     </Dimmer>
//   ),
//   ssr: false
// });


class QueryMap extends React.Component {
  render() {
    return (
    <React.Fragment>
      <Query query={QUERY_CLIENT_TRAVELS}>
      {({ loading: loadinguser, data }) => {
        const localState = data;
        const id = localState.userId;
        console.log(id);
        console.log({id}); 
        return (
          <Query query={QUERY_USERVISITS_TRAVELS} variables={{id}}>
          {({ loading: loadingVisits, data} ) => {
            console.log(data)
            let visitsUser = [];
            visitsUser.push(data.user);
            console.log(visitsUser);
            // visitsUser = (fixData(visitsUser))
            return (
              <Query query={QUERY_FRIENDSVISITS_TRAVELS}variables={{id}}>
                {({ loading: loadingFriendVisits, data: { friends }}) => {
                  console.log(friends);
                  let colors, borders;
                  let viewBorders = localState.viewBorders ? true: false;
                  if (!localState.viewingFriend) {
                    colors = visitsUser;
                    borders = fixData(friends)
                  }
                  if (localState.viewingFreind && localState.friendID) {
                    let oneFriend = friends.filter(friend => friend.id === localState.friendId)
                    oneFriend = fixData(oneFriend);
                    colors = oneFriend;
                    borders = visitsUser;
                  }
                  return (
                    <Map colors={colors} borders={borders} viewBorders={viewBorders} />
                  )
                }}
              </Query>
            )
          }}
          </Query>
        )
      }}
      </Query>
    </React.Fragment>
    )
  }
}

export default QueryMap;
