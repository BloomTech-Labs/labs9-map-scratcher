import React, { Component, Fragment } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { QUERY_VIEWING_MODAL, QUERY_USERVISITS_MODAL, MUTATION_UPDATEVISIT_MODAL } from '../../services/requests';

const buttons = [{level: 1, color: 'pink', content: 'Wishlist'}, {level: 2, color: 'yellow', content: 'Transited'}, {level: 3, color: 'green', content: 'Visited'}, {level: 4, color: 'blue', content: 'Lived'},]

export default class UpdateButtons extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Fragment>
        <Mutation 
          mutation={MUTATION_UPDATEVISIT_MODAL}
          refetchQueries={[
            {query: QUERY_VIEWING_MODAL}, 
            {query: QUERY_USERVISITS_MODAL, variables: {id: this.props.displayId}}
          ]}
        >
        {(updateVisit, {data}) => (
          <Segment>
          {buttons.map(button => {
            return (
              <Button
              key={button.level}
              inverted
              color={button.color}
              value={button.level}
              style={{width: '23%', fontSize: '.55rem'}}
              onClick={(e, data) => {
                updateVisit({ variables: {
                  id: this.props.visitId,
                  level: data.value,
                }})
              }}
              >
              {button.content}
              </Button>
            )
          })}
          </Segment>
        )}
        </Mutation>
      </Fragment>
    )
  }
}
