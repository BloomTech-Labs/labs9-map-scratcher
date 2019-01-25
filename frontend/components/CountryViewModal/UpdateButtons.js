import React, { Component, Fragment } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import { 
  QUERY_VIEWING_MODAL, 
  QUERY_USERVISITS_MODAL, 
  QUERY_SCRATCHING_MODAL,
  MUTATION_SCRATCHING_MODAL,
  MUTATION_UPDATEVISIT_MODAL } from '../../services/requests';

const buttons = [{level: 1, color: 'pink', content: 'Wishlist'}, {level: 2, color: 'yellow', content: 'Transited'}, {level: 3, color: 'green', content: 'Visited'}, {level: 4, color: 'blue', content: 'Lived'},]

export default class UpdateButtons extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    let scratched = false
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
            
            <Query query={QUERY_SCRATCHING_MODAL}>
              {({ loading, data: {scratchingComplete} }) => {
                if (loading) return <div>Loading</div>
                scratched = scratchingComplete
                return null
              }}
            </Query>
              <Mutation mutation={MUTATION_SCRATCHING_MODAL}>
                {(scratchingReset) => (
                  <Fragment>
                    {buttons.map(button => {
                      return (
                      <Button
                      key={button.level}
                      inverted
                      color={button.color}
                      value={button.level}
                      onClick={(e, data) => {
                        if (scratched) {
                          updateVisit({ variables: {id: this.props.visitId, level: data.value} })
                          scratchingReset()
                        } else {
                          alert("Please scratch off country :)")
                        }
                      }}>
                      {button.content}
                      </Button>
                    )})}
                  </Fragment>
                )}
              </Mutation>
          </Segment>
        )}
        </Mutation>
      </Fragment>
    )
  }
}
