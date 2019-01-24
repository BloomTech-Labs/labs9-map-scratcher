import React, {Component} from 'react';
import { Button, Segment, Confirm } from 'semantic-ui-react';
import {Mutation} from 'react-apollo';
import { MUTATION_UPDATEVISIT_MODAL } from '../../services/requests';

const buttons = [{level: 1, color: 'pink', content: 'Wishlist'}, {level: 2, color: 'yellow', content: 'Transited'}, {level: 3, color: 'green', content: 'Visited'}, {level: 4, color: 'blue', content: 'Lived'},]

export default class UpdateButtons extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    console.log('update buttons')
    return (
      <React.Fragment>
      <Mutation mutation={MUTATION_UPDATEVISIT_MODAL}>
      {(updateVisit, {data}) => (
        <Segment>
        {buttons.map(button => {
          return (
            <Button
            key={button.level}
            inverted
            color={button.color}
            value={button.level}

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
      </React.Fragment>
    )
  }
}
