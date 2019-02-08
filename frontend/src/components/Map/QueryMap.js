

//== Query Map ==================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react';
// import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { fixData } from './mapHelpers';
import StaticMap from './StaticMap';
import { 
  QUERY_CLIENT_TRAVELS, 
  QUERY_USERVISITS_TRAVELS, 
  QUERY_FRIENDSVISITS_TRAVELS } from '../../services/requests/travels';

//-- Legacy Code ---------------------------------
// Please indicate the conditions under which this code can be deleted:
/*const DynamicMap = dynamic(() => import('../components/Map/QueryMap'), {
  loading: () => (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ),
  ssr: false
});*/

//-- React Implementation ------------------------
export default class QueryMap extends Component {
  render() {
    return (
      <Fragment>
        <Query query={QUERY_CLIENT_TRAVELS}>
        {({ loading: loadinguser, data }) => {
          const localState = data;
          const id = localState.userId;
          return (
            <Query query={QUERY_USERVISITS_TRAVELS} variables={{id}}>
            {({ loading: loadingVisits, data} ) => {
              let visitsUser = [];
              visitsUser.push(data.user);
              visitsUser = fixData(visitsUser);
              return (
                <Query query={QUERY_FRIENDSVISITS_TRAVELS}variables={{id}}>
                  {({ loading: loadingFriendVisits, data: { friends }}) => {
                    let colors, borders;
                    let viewBorders = localState.viewBorders ? true: false;
                    if (!localState.viewingFriend) {
                      colors = visitsUser;
                      borders = fixData(friends);
                    }
                    if (localState.viewingFriend && localState.friendId) {
                      let oneFriend = friends.filter(
                        friend => friend.id === localState.friendId
                      );
                      oneFriend = fixData(oneFriend);
                      colors = oneFriend;
                      borders = visitsUser;
                    }
                    if (loadinguser || loadingVisits || loadingFriendVisits) {
                      return <div>loading</div>
                    }
                    return (
                      <StaticMap colors={colors} borders={borders} viewBorders={viewBorders} />
                    );
                  }}
                </Query>
              );
            }}
            </Query>
          );
        }}
        </Query>
      </Fragment>
    );
  }
}
