

//==============================================================================

//-- Dependencies --------------------------------
import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { USERVISITS_QUERY, FRIENDSVISITS_QUERY } from '../services/queries.js';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import React, { Component } from 'react';
import MapIndex from '../components/MapHeader/MapIndex.js';
import Legend from '../components/MapLegend/Legend.js';

//------------------------------------------------
const DynamicMap = dynamic(() => import('../components/Map/Map'), {
  loading: () => (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ),
  ssr: false
});

//------------------------------------------------
import gql from 'graphql-tag'
const testQuery = gql`
    query {
    friends(
        id: "cjqt5c95y00s40894zs7m6q4v")
    {
        name
        visits {
        country {
            name
        }
        }
    }
    }
`;



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
        const id = "cjqt5c95y00s40894zs7m6q4v";
        return (
            <div>
                <Query query={USERVISITS_QUERY} variables={{id}}>{
                    response => {
                        // Get data from response
                        let error = response.error;
                        let loading = response.loading;
                        const userData = response.data;
                        // Handle loading and errors
                        if(loading) {
                            return this.handleLoading(loading);
                        }
                        if(error) {
                            return this.handleError(error);
                        }
                        // asdfjkl;asdf;jklfsdajl;
                        return (
                            <Query query={FRIENDSVISITS_QUERY} variables={{id}}>{
                                friendsResponse => {
                                    // Get data from response
                                    error = friendsResponse.error;
                                    loading = friendsResponse.loading;
                                    const borderData = friendsResponse.data;
                                    // Handle loading and errors
                                    if(loading) {
                                        return this.handleLoading(loading);
                                    }
                                    if(error) {
                                        return this.handleError(error);
                                    }
                                    // Render
                                    console.log('WHERE IS THIS?', borderData, userData)
                                    return (
                                        <div>
                                            <DynamicMap
                                                borderData={borderData}
                                                userData={userData}
                                            />
                                            <Legend />
                                        </div>
                                    );
                                }
                            }</Query>
                        );
                    }   
                }</Query>
                <MapIndex />
            </div>
        );
    }


//== Query response handlers ===================================================

    //-- Error Handler -------------------------------
    handleError(error) {
        return (<div>Error</div>);
    }
    handleLoading(loading) {
        return (<div>Loading</div>);
    }
}
