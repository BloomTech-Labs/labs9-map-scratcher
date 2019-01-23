import React, { Component } from 'react';
// import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { QUERY_CLIENT_TRAVELS, QUERY_USERVISITS_TRAVELS, QUERY_FRIENDSVISITS_TRAVELS, QUERY_CLIENT_MODAL } from '../../services/requests.js';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { fixData } from './mapHelpers';
import StaticMap from './StaticMap'

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
                    console.log('uservisits', data)
                    let visitsUser = [];
                    visitsUser.push(data.user);
                    visitsUser = (fixData(visitsUser))
                    return (
                      <Query query={QUERY_FRIENDSVISITS_TRAVELS}variables={{id}}>
                        {({ loading: loadingFriendVisits, data: { friends }}) => {
                          let colors, borders;
                          let viewBorders = localState.viewBorders ? true: false;
                          console.log('is this asshole triggering', localState.friendID)
                          if (!localState.viewingFriend) {
                            console.log('no friend')
                            colors = visitsUser;
                            borders = fixData(friends)
                            console.log(borders)
                          }
                          if (localState.viewingFriend && localState.friendId) {
                            console.log('view a friend')
                            let oneFriend = friends.filter(friend => friend.id === localState.friendId)
                            console.log('in oneFriend', oneFriend);
                            oneFriend = fixData(oneFriend);
                            console.log('singleFriend', oneFriend);
                            colors = oneFriend;
                            borders = visitsUser;
                          }
                          if (loadinguser || loadingVisits || loadingFriendVisits) {
                            return <div>loading</div>
                          }
                          return (
                            <StaticMap colors={colors} borders={borders} viewBorders={viewBorders} />
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
