

//== Update Buttons ============================================================
/*
  Please add documentation detailing the purpose and use of this component.
  Maybe DisabledButtons, CreateButtons, and UpdateButtons should all reside in
  the same file?
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import {
  QUERY_USERVISITS_MODAL,
  QUERY_SCRATCHING_MODAL,
  QUERY_VISIT_MODAL,
  MUTATION_SCRATCHING_MODAL,
  MUTATION_UPDATEVISIT_MODAL } from '../../services/requests/modal';
  import {
      QUERY_CLIENT_TRAVELS,
  } from '../../services/requests/travels';

//-- Types of buttons to display -----------------
/* buttonTypes: An array of objects used to configure buttons. There is one
  object per visit level. Visit levels should probably be defined as constants
  in an external file, and referenced by name in all dependent files. */
const buttons = [
  {level: 1, color: 'pink', content: 'Wishlist'},
  {level: 2, color: 'yellow', content: 'Transited'},
  {level: 3, color: 'green', content: 'Visited'},
  {level: 4, color: 'blue', content: 'Lived'},
];

//-- React Implementation ------------------------
export default class UpdateButtons extends Component {
  render(){
    let scratched = false;
    const { displayId, visitId } = this.props
    return (
      <Fragment>
        <Mutation
          mutation={MUTATION_UPDATEVISIT_MODAL}
          update={(cache, {data: {updateVisit}}) => {
            const res = cache.readQuery({ query: QUERY_VISIT_MODAL, variables: {id: visitId} });
            console.log(res)
            cache.writeQuery({
              query: QUERY_VISIT_MODAL,
              variables: {id: visitId},
              data: {user: {visits: visits.map(v => v.id === visitId ? {...v, lvl} : v)}, __typename: 'Visit', __typename: 'User'} ,
            });
            const visits = user.visits
            const lvl = updateVisit.level
            cache.writeQuery({
              query: QUERY_VISIT_MODAL,
              variables: {id: visitId},
              data: {user: {visits: visits.map(v => v.id === visitId ? {...v, lvl} : v)}, __typename: 'Visit', __typename: 'User'} ,
            });
          console.log('visits', user.visits)
          console.log('new note', updateVisit.note)
          }}
        >
        {(updateVisit, {data}) => (
          <Segment>
            <Query query={QUERY_SCRATCHING_MODAL}>
              {({ loading, data: {scratchingComplete} }) => {
                if (loading) {
                  return <div>Loading</div>
                }
                scratched = scratchingComplete;
                return null;
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
                              updateVisit({ variables: {id: visitId, level: data.value} });
                              scratchingReset();
                            } else {
                              alert("Please scratch off country :)");
                            }
                          }}
                        >
                        {button.content}
                        </Button>
                      );
                    })}
                  </Fragment>
                )}
              </Mutation>
          </Segment>
        )}
        </Mutation>
      </Fragment>
    );
  }
}
