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
          <div>use me for testing!</div>
        )
    }

}
//
// <React.Fragment>
//   <Query query={visit? }>
//   if visit {
//     mutation = MUTATION_UPDATE
//     visit = visit.id
//     action = updateVisit
//   }
//   if !visit {
//     mutation = MUTATION_ADD
//     action = addVisit
//     visit = null;
//   }
//   return (
//     <Mutation mutation={mutation}>
//     if visit
//     onClick=mutation(variables, level: whatever i just clicked)
//     </Mutation>
//   )
//   </Query>
// </React.Fragment>
