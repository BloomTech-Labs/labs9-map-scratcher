import React, { Component, Fragment } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { 
  
  MUTATION_CREATEVISIT_MODAL } from '../../services/requests/modal';

const buttons = [{level: 1, color: 'pink', content: 'Wishlist'}, {level: 2, color: 'yellow', content: 'Transited'}, {level: 3, color: 'green', content: 'Visited'}, {level: 4, color: 'blue', content: 'Lived'},]

export default class CreateButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Mutation mutation={MUTATION_CREATEVISIT_MODAL}>
        {(createVisit, { data }) => (
            <Segment>
            {buttons.map(button => {
              return (
                <Button
                  key={button.level}
                  inverted
                  color={button.color}
                  value={button.level}
                  onClick={(e,data) => {
                    createVisit({ variables: {
                      userId: this.props.displayId,
                      countryId: this.props.countryId,
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
