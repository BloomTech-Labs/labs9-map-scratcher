

//==============================================================================

//-- Dependencies --------------------------------
import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { QUERY_CLIENT_TRAVELS, QUERY_USERVISITS_TRAVELS, QUERY_FRIENDSVISITS_TRAVELS, QUERY_CLIENT_MODAL } from '../services/requests.js';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import React, { Component } from 'react';
import MapHeader from '../components/MapHeader/MapHeader';
import Legend from '../components/MapLegend/Legend';
import CountryModal from '../components/CountryViewModal/CountryModal'
import { fixData } from '../components/Map/mapHelpers';


//------------------------------------------------
const DynamicMap = dynamic(() => import('../components/Map/StaticMap'), {
  loading: () => (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ),
  ssr: false
});


//== React lifecycle methods ===================================================

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <React.Fragment>
          <MapHeader />
            <Query query={QUERY_CLIENT_TRAVELS}>
            {({ loading: loadinguser, data }) => {
              const localState = data;
              const id = localState.userId;
              return (
                <Query query={QUERY_USERVISITS_TRAVELS} variables={{id}}>
                {({ loading: loadingVisits, data} ) => {
                  let visitsUser = [];
                  visitsUser.push(data.user);
                  visitsUser = (fixData(visitsUser))
                  return (
                    <Query query={QUERY_FRIENDSVISITS_TRAVELS}variables={{id}}>
                      {({ loading: loadingFriendVisits, data: { friends }}) => {
                        let colors, borders;
                        let viewBorders = localState.viewBorders ? true: false;
                        if (!localState.viewingFriend) {
                          colors = visitsUser;
                          borders = fixData(friends)
                        }
                        if (localState.viewingFriend && localState.friendId) {
                          let oneFriend = friends.filter(friend => friend.id === localState.friendId)
                          oneFriend = fixData(oneFriend);
                          colors = oneFriend;
                          borders = visitsUser;
                        }
                        if (loadinguser || loadingVisits || loadingFriendVisits) {
                          return <div>loading</div>
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
            <Query query={QUERY_CLIENT_MODAL}>
            {({ loading, data }) => {
              if (!data.modalOpen) {
                return (
                  null
                )
              }
              if (data.modalOpen) {
                return (
                  <CountryModal countryId={data.countryId}/>
                )
              }
            }}
            </Query>
            <Legend />
          </React.Fragment>
        )
    }
}
