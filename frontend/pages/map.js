import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { USERVISITS_QUERY, FRIENDSVISITS_QUERY } from '../services/queries';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import React, { Component } from 'react';

import MapIndex from '../components/MapHeader/MapIndex.js';
import Legend from '../components/MapLegend/Legend.js';

const DynamicMap = dynamic(() => import('../components/Map/Map'), {
  loading: () => (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ),
  ssr: false
});

const id = "cjqt5c95y00s40894zs7m6q4v";



//== React lifecycle methods ===================================================

    //-- Constructor ---------------------------------
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMapData: null,
            friendsMapData: null,
        };
    }

    //-- Rendering -----------------------------------
    render() {
        return (
            <React.Fragment>
                <Query query={FRIENDSVISITS_QUERY} variable={{id}}>
                    {this.handleResponseFriendsMapData}
                </Query>
                <Query query={USERVISITS_QUERY} variable={{id}}>
                    {this.handleResponseUserMapData}
                </Query>
                <MapIndex />
                <div>
                    <DynamicMap
                        borderData={this.state.borderData}
                        userData={this.state.userData}
                    />
                    <Legend />
                </div>
            </React.Fragment>
        );
    }


//== Query response handlers ===================================================

    //-- Error Handler -------------------------------
    handleError(error) {
        console.log('Error:', error);
    }

    //-- Receive User Map Data -----------------------
    handleResponseUserMapData = (response) => {
        // Get data from response
        const error = response.error;
        const userData = response.data;
        // Handle loading and errors
        if(error) {
            this.handleError(error);
            return;
        }
        // Set state and rerender
        this.setState({
            userMapData: userData,
        });
        // Return empty jsx (a return value is necessary for Query)
        return null;
    }

    //-- Receive Map Data for Friends ----------------
    handleResponseFriendsMapData = (response) => {
        // Get data from response
        const error = response.error;
        const friendsVisitsData = response.data;
        // Handle loading and errors
        if(error) {
            this.handleError(error);
            return;
        }
        // Set state and rerender
        this.setState({
            friendsMapData: friendsVisitsData,
        });
        // Return empty jsx (a return value is necessary for Query)
        return null;
    }
}
