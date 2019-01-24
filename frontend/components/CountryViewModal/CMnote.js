import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo';
import { QUERY_USERVISITS_TRAVELS } from '../../services/requests';
import { Button } from 'semantic-ui-react';
import UpdateNote from './UpdateNote';
import DisabledNote from './DisabledNote'

export default class CountryModalNote extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      console.log('props', this.props)
      //should query for the user visits by passed id (the user or the friend) and then filter by country and act according to the available information.

      //currently works with a passed in UserId, but not the friend.

      //when a friend's id is passed, it is saying that user is undefined on line 26 (again, though - works for user id. the props console log above registers an id for the the displayId. )
        return (
          <React.Fragment>
            <Query query={QUERY_USERVISITS_TRAVELS} variables={{ id: this.props.displayId }}>
              {({ loading, error,  data: { user }}) => {
                if (loading) {
                  return <div>loading</div>
                }
                if (error) {
                  return <div>error</div>
                }
                console.log('user', user);
                let existing;
                if (user) {
                  existing = user.visits.filter(visit =>{
                    return visit.country.id === this.props.countryId
                  }

                  )
                }
                console.log('does user have visit matching id', existing);
                if (existing[0]) {
                  console.log('do they have a note', existing[0].note)
                }

                if ((existing[0]) && (this.props.disabled) && (existing[0].note)) {
                  return (
                    <DisabledNote note={existing[0].note} disabled={true} />
                  )
                }
                if((existing[0]) && (!this.props.disabled) && (!existing[0].note)) {
                  return (
                    <UpdateNote visitId={existing[0].id} />
                  )
                }
                if ((existing[0]) && (!this.props.disabled) &&(existing[0].note)) {
                  console.log(existing[0].note)
                  return (
                    <UpdateNote visitId={existing[0].id} note={existing[0].note}/>
                  )
                }
                if (!existing[0].note && this.props.disabled) {
                  return (
                    <DisabledNote disabled={true}/>
                  )
                }
                console.log('i failed', existing, this.props, this.props.displayId);
                return null;
              }}
            </Query>

          </React.Fragment>
        )
    }
}
