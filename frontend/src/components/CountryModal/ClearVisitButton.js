import React from 'react'
import { Button } from 'semantic-ui-react'
import { Query, Mutation } from 'react-apollo';
import {
  MUTATION_DELETEVISIT_MODAL,
  QUERY_USERVISITS_MODAL } from '../../services/requests/modal';

const ClearVisitButton = ({ countryId, userId, friendId, disabled, history }) => {
  console.log(disabled);
  return (
    disabled ?
      <Button onClick={() => history.push(`/friends/${friendId}`)}>
        View Friend's Profile
      </Button>
    :
    (
      <Query query={QUERY_USERVISITS_MODAL} variables={{id: userId}}>
        {({ loading, data: {user} }) => {
          if (loading) return <div>Loading</div>
          let visits = user.visits
          let visit = visits.find(visit => visit.country.id === countryId);
          if (!visit) {
            return (null);
          }
          let visitId = visit.id
          return (
            <Mutation
              mutation={MUTATION_DELETEVISIT_MODAL}
              variables={{ id: visitId }}
              update={(cache, {data}) => {
                let result = cache.readQuery({ query: QUERY_USERVISITS_MODAL, variables: {id: userId} });
                const deletedVisit = data.deleteVisit;
                const visits = result.user.visits.filter(visit => visit.id !== deletedVisit.id);
                let user = result.user
                user.visits = visits;
                console.log(result);
                cache.writeQuery({
                  query: QUERY_USERVISITS_MODAL,
                  variables: {id: userId},
                  data: { user },
                });
              }}
            >
              {deleteVisit => (
                <Button
                  negative
                  onClick={deleteVisit}
                >Clear Visit</Button>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  )
}

export default ClearVisitButton;
