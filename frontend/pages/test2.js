

//== Travels Page ==============================================================
/*
  [Insert Documentation here]
*/

//-- Dependencies --------------------------------
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import React, { Component, Fragment } from 'react';
import {
  QUERY_CLIENT_TRAVELS,
  QUERY_ME_TRAVELS,
   } from '../services/requests/tests';


//-- React Implementation ------------------------
export default class extends Component {
  render() {
    return (
      <div className='travels_map-container'>
        <Query query={QUERY_CLIENT_TRAVELS}>
        {({ loading: loadinguser, data }) => {
          const localState = data;
          console.log('query client', localState);
          if (!localState.userId) {
            return null;
          }
          return (
            <Fragment>
              <Query query={QUERY_ME_TRAVELS}>
              {({ loading: loadingVisits, error, data} ) => {
                console.log('travels inside qut', data);
                if (loadinguser || loadingVisits) {
                  return (<div>Loading</div>)
                }
                if (error) {
                  console.log(error);
                  return (<div> I fucked up</div>)
                }
                return (
                  <div>{data.me.name}</div>
                );
              }}
              </Query>
            </Fragment>
          )
        }}
        </Query>
      </div>
    );
  }
}
