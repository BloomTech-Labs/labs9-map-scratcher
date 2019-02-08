

//== Level of Visit ============================================================
/*
  Please add documentation detailing the purpose and use of this component.

  Basic Function:
    query current userId
    query the visits for that user
    onClick = if the country they clicked on is === visit.country.id, if the country they clicked on is != visit.country.id, allow for change of level mutation
    warn user asking if they really want to change their level of visit
    if yes - allow for mutation to change level of visit after rescratch
    if no - do nothing
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import DisabledButtons from './DisabledButtons';
import UpdateButtons from './UpdateButtons';
import CreateButtons from './CreateButtons';
import { QUERY_USERVISITS_MODAL } from '../../services/requests/modal';

//-- React Implementation ------------------------
export default class LevelOfVisit extends Component {
  render() {
    if (this.props.disabled) {
      return (
        <DisabledButtons />
      );
    }
    return (
      <Fragment>
        <Query query={QUERY_USERVISITS_MODAL} variables={{ id: this.props.displayId }}>
        {({ loading, data: { user }}) => {
          let existing;
          if (user) {
            existing = user.visits.filter(visit => {
              return visit.country.id === this.props.countryId;
            });
          }
          if (existing.length > 0) {
            return (
              <UpdateButtons countryId={this.props.countryId} visitId={existing[0].id} displayId={this.props.displayId}/>
            );
          }
          return (
            <CreateButtons countryId={this.props.countryId} displayId={this.props.displayId} />
          );
        }}
        </Query>
      </Fragment>
    );
  }
}
