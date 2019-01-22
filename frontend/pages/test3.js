

//==============================================================================

//-- Dependencies --------------------------------
import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { QUERY_CLIENT_TRAVELS, QUERY_USERVISITS_TRAVELS, QUERY_FRIENDSVISITS_TRAVELS } from '../services/requests.js';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import React, { Component } from 'react';
import MapIndex from '../components/MapHeader/MapIndex.js';
import Legend from '../components/MapLegend/Legend.js';
import { fixData } from '../components/Map/mapHelpers';

//-- Constants -----------------------------------
const testUserId = "cjqt5c95y00s40894zs7m6q4v";

//------------------------------------------------
const DynamicMap = dynamic(() => import('../components/Map/Map'), {
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
        return this.makeQueriesAndRenderMap();
    }
    displayMap(colors, borders) {
        return (
            <React.Fragment>
                <MapIndex />
                <div>
                    <DynamicMap
                        colors={colors}
                        borders={borders}
                    />
                    <Legend />
                </div>
            </React.Fragment>
        );
    }


//== Query response handlers ===================================================

    //-- Query Renderers -----------------------------
    makeQueriesAndRenderMap() {
        // Not strictly necessary, but it clarifies intent
        return this.requestLocalState();
    }
    requestLocalState() {
      console.log('client travels query'); 
      let query = QUERY_CLIENT_TRAVELS
      let responseHandler = (response) => {
        return this.handleResponseLocalState(response);
      }
      return (
        <Query query={query}>{responseHandler}</Query>
      )
    }
    requestVisitsUser(localState) {
        let query = QUERY_USERVISITS_TRAVELS;
        let variables = {id: localState.userId};
        let responseHandler = (response) => {
            return this.handleResponseVisitsUser(response, localState);
        };
        return (
            <Query query={query} variables={variables}>
                {responseHandler}
            </Query>
        );
    }
    requestVisitsFriends(visitsUser, localState) {
        let query = QUERY_FRIENDSVISITS_TRAVELS;
        let variables = { id: localState.userId };
        let responseHandler = (response) => {
            return this.handleResponseVisitsFriends(response, visitsUser, localState);
        };
        return (
            <Query query={query} variables={variables}>
                {responseHandler}
            </Query>
        );
    }

    //-- Subcomponent Display ------------------------
    displayError(error) {
        return (<div>Error</div>);
    }
    displayLoading() {
        return (<div>Loading</div>);
    }

    //-- Response handlers ---------------------------
    handleResponseLocalState(response) {
      let error = response.error;
      let loading = response.loading;
      let localState = response.data;
      if(loading) {
        return this.displayLoading();
      }
      if (error) {
        return this.displayError(error);
      }
      return this.requestVisitsUser(localState)
    }
    handleResponseVisitsUser(response, localState) {
        // Get data from response
        let error = response.error;
        let loading = response.loading;
        let visitsUser = [];
        visitsUser.push(response.data.user);
        visitsUser = fixData(visitsUser);
        // Handle loading and errors
        if(loading) {
            return this.displayLoading();
        }
        if(error) {
            return this.displayError(error);
        }
        // Continue Rendering
        return this.requestVisitsFriends(visitsUser, localState);
    }
    handleResponseVisitsFriends(response, visitsUser, localState) {
        // Get data from response
        let error = response.error;
        let loading = response.loading;

        let colors, borders;

        if (!localState.viewingFriend) {
          colors = visitsUser;
          borders = fixData(response.data.friends);
        }

        if (localState.viewingFriend && localState.friendId) {
          let oneFriend = response.data.friends.filter(friend => friend.id === localState.friendId)
          oneFriend = fixData(oneFriend);
          colors = oneFriend;
          borders = visitsUser;
        }
        // Handle loading and errors
        if(loading) {
            return this.displayLoading();
        }
        if(error) {
            return this.displayError(error);
        }
        // Continue Rendering
        return this.displayMap(colors, borders);
    }
}
