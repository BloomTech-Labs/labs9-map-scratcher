

//==============================================================================

//-- Dependencies --------------------------------
import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { QUERY_CLIENT_TRAVELS, QUERY_USERVISITS_TRAVELS, QUERY_FRIENDSVISITS_TRAVELS, MUTATION_TOGGLE_SOMETHING } from '../services/requests.js';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import React, { Component } from 'react';
import QueryMap from '../components/Map/QueryMap.js';
import { fixData } from '../components/Map/mapHelpers';

//-- Constants -----------------------------------
const testUserId = "cjqt5c95y00s40894zs7m6q4v";

const DynamicMap = dynamic(() => import('../components/Map/StaticMap'), {
  loading: () => (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ),
  ssr: false
});

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // return this.makeQueriesAndRenderMap();
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
                {({ loading: loadingVisits, data: { user }} ) => {
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
                          <DynamicMap colors={colors} borders={borders} viewBorders={viewBorders} />
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
