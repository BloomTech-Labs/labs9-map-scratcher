import React, { Component } from 'react';
import { Button, Segment, Confirm } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import DisabledButtons from './DisabledButtons';
import UpdateButtons from './UpdateButtons';
import CreateButtons from './CreateButtons';
import { QUERY_CLIENT_PROFILE, QUERY_USERVISITS_TRAVELS, MUTATION_UPDATEVISIT_MODAL, MUTATION_CREATEVISIT_MODAL } from '../../services/requests';

//constants
const buttons = [{level: 1, color: 'pink', content: 'Wishlist'}, {level: 2, color: 'yellow', content: 'Transited'}, {level: 3, color: 'green', content: 'Visited'}, {level: 4, color: 'blue', content: 'Lived'},]
export default class LevelOfVisitButtons extends Component {
  constructor(props){
    super(props);
  }
    render() {
      if (this.props.disabled) {
        return (
          <DisabledButtons />
        )
      }
      return (
        <React.Fragment>
          <Query query={QUERY_USERVISITS_TRAVELS} variables={{ id: this.props.displayId }}>

            {({ loading, data: { user }}) => {
              console.log('in the buttons',user);
              let existing;
              if (user) {
                existing = user.visits.filter(visit =>{
                  return visit.country.id === this.props.countryId
                }

                )
              }
              console.log(existing);
              if (existing.length > 0) {
                return (
                  <UpdateButtons countryId={this.props.countryId} visitId={existing.id}/>
                )
              }
              return (
                <CreateButtons countryId={this.props.countryId} displayId={this.props.displayId}/>
              )
            }}
          </Query>

        </React.Fragment>
      )
    }
}


//query current userId
//query the visits for that user
//onClick = if the country they clicked on is === visit.country.id, if the country they clicked on is != visit.country.id, allow for change of level mutation
//warn user asking if they really want to change their level of visit
//if yes - allow for mutation to change level of visit after rescratch
//if no - do nothing
