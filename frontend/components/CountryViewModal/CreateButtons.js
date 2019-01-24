import React, { Component, Fragment } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { QUERY_VIEWING_MODAL, QUERY_USERVISITS_MODAL, MUTATION_CREATEVISIT_MODAL } from '../../services/requests';

const buttons = [{level: 1, color: 'pink', content: 'Wishlist'}, {level: 2, color: 'yellow', content: 'Transited'}, {level: 3, color: 'green', content: 'Visited'}, {level: 4, color: 'blue', content: 'Lived'},]

export default class CreateButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('create buttons')
    return (
      <Fragment>
        <Mutation
          mutation={MUTATION_CREATEVISIT_MODAL}
          refetchQueries={[
            {query: QUERY_VIEWING_MODAL},
            {query: QUERY_USERVISITS_MODAL, variables: {id: this.props.displayId}}
          ]}
        >
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
