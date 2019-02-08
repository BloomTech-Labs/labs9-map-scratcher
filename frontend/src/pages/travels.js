

//== Travels Page ==============================================================
/*
  [Insert Documentation here]
*/

//-- Dependencies --------------------------------
// import dynamic from 'next/dynamic';
import StaticMap from '../components/Map/StaticMap';
import { Query } from 'react-apollo';
import React, { Component, Fragment } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import MapHeader from '../components/MapHeader/MapHeader';
import Legend from '../components/MapLegend/Legend';
import CountryModal from '../components/CountryModal/CountryModal';
import ViewBordersCheckbox from '../components/MapHeader/ViewBordersCheckbox';
import { fixData } from '../components/Map/mapHelpers';
import '../components/Map/map.scss';
import { green } from '../components/Map/countryStyles';
import {
  QUERY_ME_TRAVELS,
  QUERY_CLIENT_TRAVELS,
  QUERY_MODAL_TRAVELS } from '../services/requests/travels';

//-- Subcomponent: Dynamic Map -------------------
// const DynamicMap = dynamic(() => import('../components/Map/StaticMap'), {
//   loading: () => (
//     <Dimmer active>
//       <Loader size="large" />
//     </Dimmer>
//   ),
//   ssr: false
// });

//-- React Implementation ------------------------
export default class Travels extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: green
    }
  }
  
  setTheme = (color) => {
    this.setState({theme: color})
  }
  
  render() {
    return (
      <div className='travels_map-container'>
        <MapHeader logout={this.props.logout} {...this.props} />
        <Query query={QUERY_CLIENT_TRAVELS}>
        {({ loading: loadinglocal, data }) => {
          const localState = data;
          if (loadinglocal) {
            return (
              <Dimmer active>
                <Loader />
              </Dimmer>
            )
          }
          if (!localState) {
            return null;
          }
          return (
            <Fragment>
              <Query query={QUERY_ME_TRAVELS} >
              {({ loading: loadingVisits, data: { me }} ) => {
                if (loadingVisits) {
                  return (
                    <Dimmer active>
                      <Loader />
                    </Dimmer>
                  )
                }
                let visitsUser = [];
                if (me.visits && me.visits.length > 0) {
                  visitsUser.push(me);
                }
                visitsUser = (fixData(visitsUser))
                let colors, borders;
                let friendVisits = [];
                let viewBorders = localState.viewBorders ? true: false;
                if (!localState.viewingFriend) {
                  colors = visitsUser;
                  if (me.friends.length > 0) {
                    friendVisits = fixData(me.friends)
                  }
                  borders = friendVisits;
                }
                if (localState.viewingFriend && localState.friendId) {
                  let oneFriend = me.friends.filter(friend => friend.id === localState.friendId)
                  oneFriend = fixData(oneFriend);
                  colors = oneFriend;
                  borders = visitsUser;
                }
                return (
                  <Fragment>
                    <StaticMap 
                      theme={this.state.theme}
                      colors={colors} 
                      borders={borders} 
                      viewBorders={viewBorders} 
                      viewingCountry={localState.countryId}
                    />
                    <Query query={QUERY_MODAL_TRAVELS}>
                    {({ loading, data }) => {
                      if (loading) return <div>Loading</div>
                      if (!data.modalOpen) {
                        return (
                          null
                        )
                      }
                      if (data.modalOpen) {
                        return (
                          <CountryModal {...this.props} userId={me.id} theme={this.state.theme}/>
                        );
                      }
                    }}
                    </Query>
                  </Fragment>
                );
              }}
              </Query>
            </Fragment>
          )
        }}
        </Query>
        <div className='travels_checkboxMobile'>
        <ViewBordersCheckbox />
        </div>
        <Legend setTheme={this.setTheme}/>
      </div>
    );
  }
}
