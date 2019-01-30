

//== Travels Page ==============================================================
/*
  [Insert Documentation here]
*/

//-- Dependencies --------------------------------
import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import React, { Component, Fragment } from 'react';
import MapHeader from '../components/MapHeader/MapHeader';
import Legend from '../components/MapLegend/Legend';
import CountryModal from '../components/CountryModal/CountryModal';
import ViewBordersCheckbox from '../components/MapHeader/ViewBordersCheckbox';
import { fixData } from '../components/Map/mapHelpers';
import '../components/Map/map.less';
import {
  QUERY_CLIENT_TRAVELS,
  QUERY_USERVISITS_TRAVELS,
  QUERY_FRIENDSVISITS_TRAVELS,
  QUERY_MODAL_TRAVELS } from '../services/requests/travels';

//-- Subcomponent: Dynamic Map -------------------
const DynamicMap = dynamic(() => import('../components/Map/StaticMap'), {
  loading: () => (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ),
  ssr: false
});

//-- React Implementation ------------------------
export default class extends Component {
  render() {
    return (
      <div className='travels_map-container'>
        <MapHeader />
        <Query query={QUERY_CLIENT_TRAVELS}>
        {({ loading: loadinguser, data }) => {
          const localState = data;
          if (!localState.userId) {
            return null;
          }
          const id = localState.userId;
          console.log('travels inside qct', id)
          return (
            <Fragment>
              <Query query={QUERY_USERVISITS_TRAVELS} variables={{id}}>
              {({ loading: loadingVisits, data} ) => {
                console.log('travels inside qut', id);
                let visitsUser = [];
                if (data.user) {
                  visitsUser.push(data.user);
                }
                visitsUser = (fixData(visitsUser))
                return (
                  <Query query={QUERY_FRIENDSVISITS_TRAVELS} variables={{id}}>
                    {({ loading: loadingFriendVisits, data: { friends }}) => {
                      console.log('travels inside qft', id);
                      let colors, borders;
                      let friendVisits = [];
                      let viewBorders = localState.viewBorders ? true: false;
                      if (!localState.viewingFriend) {
                        colors = visitsUser;
                        if (friends) {
                          friendVisits = fixData(friends)
                        }
                        borders = friendVisits;
                      }
                      if (localState.viewingFriend && localState.friendId) {
                        let oneFriend = friends.filter(friend => friend.id === localState.friendId)
                        oneFriend = fixData(oneFriend);
                        colors = oneFriend;
                        borders = visitsUser;
                      }
                      if (loadinguser || loadingVisits || loadingFriendVisits) {
                        return <div>loading...</div>
                      }
                      return (
                        <DynamicMap colors={colors} borders={borders} viewBorders={viewBorders} />
                      );
                    }}
                  </Query>
                );
              }}
              </Query>
            </Fragment>
          )
        }}
        </Query>
        <Query query={QUERY_MODAL_TRAVELS}>
        {({ loading, data }) => {
          if (!data.modalOpen) {
            return (
              null
            )
          }
          if (data.modalOpen) {
            return (
              <CountryModal countryId={data.countryId}/>
            );
          }
        }}
        </Query>
        <div className='travels_checkboxMobile'>
        <ViewBordersCheckbox />
        </div>
        <Legend />
      </div>
    );
  }
}
