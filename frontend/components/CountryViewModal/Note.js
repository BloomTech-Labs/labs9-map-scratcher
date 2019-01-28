

//== Note ======================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo';
import { QUERY_USERVISITS_TRAVELS } from '../../services/requests';
import UpdateNote from './UpdateNote';
import DisabledNote from './DisabledNote'

//-- React Implementation ------------------------
export default class Note extends Component {
  render() {      
    return (
      <Fragment>
        <Query query={QUERY_USERVISITS_TRAVELS} variables={{ id: this.props.displayId }}>
          {({ loading, error,  data: { user }}) => {
            if (loading) {
              return <div>loading</div>
            }
            if (error) {
              return <div>error</div>
            }
            let existing;
            if (user) {
              existing = user.visits.filter(visit =>{
                return (visit.country.id === this.props.countryId);
              });
            }
            if ((existing[0]) && (this.props.disabled) && (existing[0].note)) {
              return (
                <DisabledNote note={existing[0].note} disabled={true} />
              );
            }
            if((existing[0]) && (!this.props.disabled) && (!existing[0].note)) {
              return (
                <UpdateNote visitId={existing[0].id} displayId={this.props.displayId} />
              );
            }
            if ((existing[0]) && (!this.props.disabled) &&(existing[0].note)) {
              return (
                <UpdateNote visitId={existing[0].id} note={existing[0].note} displayId={this.props.displayId} />
              );
            }
            if ((existing[0]) && !existing[0].note && this.props.disabled) {
              return (
                <DisabledNote disabled={true} />
              );
            }
            if (!existing[0]) {
              return (
                <DisabledNote disabled={true} />
              );
            }
            console.log('I failed', existing, this.props, this.props.displayId);
            return null;
          }}
        </Query>
      </Fragment>
    );
  }
}
