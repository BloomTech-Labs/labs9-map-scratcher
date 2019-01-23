

//==============================================================================

//-- Dependencies --------------------------------
import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { QUERY_CLIENT_TRAVELS, QUERY_USERVISITS_TRAVELS, QUERY_FRIENDSVISITS_TRAVELS, MUTATION_TOGGLE_SOMETHING } from '../services/requests.js';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import React, { Component } from 'react';
import MapIndex from '../components/MapHeader/MapIndex.js';
import Legend from '../components/MapLegend/Legend.js';
import { fixData } from '../components/Map/mapHelpers';

//-- Constants -----------------------------------
const testUserId = "cjqt5c95y00s40894zs7m6q4v";



export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // return this.makeQueriesAndRenderMap();
        return (
          <Mutation mutation ={MUTATION_TOGGLE_SOMETHING}>
          {mutate => <button onClick={mutate}>Toggle Stuff</button>}
          </Mutation>
        )
    }
}