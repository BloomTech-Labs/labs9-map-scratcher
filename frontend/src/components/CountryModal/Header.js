

//== Header ====================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'
import { Query, Mutation } from 'react-apollo'
import { 
  QUERY_COUNTRYID_MODAL, 
  MUTATION_CLOSEMODAL_MODAL } from '../../services/requests/modal'

//-- React Implementation ------------------------
export default class Header extends Component {
  render() {
    return (
      <Query query={QUERY_COUNTRYID_MODAL} variables={{id: this.props.id}}>
        {({ loading, data: {countryById} }) => {
          if (loading) {
            return <div>Loading</div>
          }
          return (
            <Card.Header className='modal_header'>
            <p>{countryById.name}</p>
              <Mutation mutation={MUTATION_CLOSEMODAL_MODAL}>
                {closeModal => (
                  <Button
                  size='tiny' onClick={closeModal}>
                  <Icon name="world"/>Return to Map</Button>
                )}
              </Mutation>
            </Card.Header>
          );
        }}
      </Query>
    );
  }
}
