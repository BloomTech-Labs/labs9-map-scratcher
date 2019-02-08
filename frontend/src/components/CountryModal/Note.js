

//== Note ======================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';
import { QUERY_USERVISITS_MODAL } from '../../services/requests/modal';
import UpdateNote from './UpdateNote';
import DisabledNote from './DisabledNote'

//-- React Implementation ------------------------
export default class Note extends Component {
  render() {      
    return (
      <Fragment>
        <Query query={QUERY_USERVISITS_MODAL} variables={{ id: this.props.displayId }}>
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
            return null;
          }}
        </Query>
      </Fragment>
    );
  }
}
