//==============================================================================

//-- Dependencies --------------------------------
import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { QUERY_CLIENT_TRAVELS, QUERY_USERVISITS_TRAVELS, QUERY_FRIENDSVISITS_TRAVELS, QUERY_CLIENT_MODAL } from '../services/requests.js';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import React, { Component } from 'react';
import MapHeader from '../components/MapHeader/MapHeader.js';
import Legend from '../components/MapLegend/Legend.js';
import CountryModal from '../components/CountryViewModal/CountryModal'
import { fixData } from '../components/Map/mapHelpers';

//-- Constants -----------------------------------
const testUserId = "cjqt5c95y00s40894zs7m6q4v";

//------------------------------------------------



//== React lifecycle methods ===================================================

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <React.Fragment>
            <form>
            <input type='text' />
            <input type='text' />
            </form>
          </React.Fragment>
        )
    }

}
