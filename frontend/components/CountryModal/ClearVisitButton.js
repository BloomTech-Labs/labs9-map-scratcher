import React from 'react'
import { Button } from 'semantic-ui-react'
import { Router } from '../../services/routes';
import { Query, Mutation } from 'react-apollo';
import { 
  MUTATION_DELETEVISIT_MODAL, 
  QUERY_USERVISITS_MODAL } from '../../services/requests/modal';

const ClearVisitButton = ({ countryId, userId, friendId, disabled }) => {
  return (
    disabled ? 
    <Button 
      onClick={() => Router.pushRoute('friends', {id: friendId})}
    >View Friend's Profile</Button>
    :
    (
      <Query query={QUERY_USERVISITS_MODAL} variables={{id: userId}}>
        {({ loading, data: {user} }) => {
          if (loading) return <div>Loading</div>
          let visits = user.visits
          let visit = visits.find(visit => visit.country.id === countryId)
          let visitId = visit.id
          return (
            <Mutation 
              mutation={MUTATION_DELETEVISIT_MODAL} 
              variables={{ id: visitId }}
              update={(cache, {data}) => {
                const result = cache.readQuery({ query: QUERY_USERVISITS_MODAL, variables: {id: userId} });
                const deletedVisit = data.deleteVisit
                const visits = result.user.visits
                cache.writeQuery({
                  query: QUERY_USERVISITS_MODAL,
                  variables: {id: userId},
                  data: { visits: visits.filter(visit => visit.id !== deletedVisit.id) },
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