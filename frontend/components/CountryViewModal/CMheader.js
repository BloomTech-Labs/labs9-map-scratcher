import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import { Query, Mutation } from 'react-apollo'
import { QUERY_COUNTRYID_MODAL, MUTATION_CLOSEMODAL_TRAVELS } from '../../services/requests'

export default class CMheader extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Query query={QUERY_COUNTRYID_MODAL} variables={{id: this.props.id}}>
        {({ loading, data: {countryById} }) => {
          if (loading) return <div>Loading</div>
          return (
            <Card.Header style={{paddingBottom: '5%'}}><i className='pe flag'/>
            {countryById.name}
              <Mutation mutation={MUTATION_CLOSEMODAL_TRAVELS}>
                {closeModal => (
                  <Button onClick={closeModal}>Return to Map</Button>
                )}
              </Mutation>
            </Card.Header>
          )
        }} 
      </Query>
    )
  }
}
