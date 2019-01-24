import React from 'react'
import { Table } from 'semantic-ui-react'
import { Query } from 'react-apollo';
import { QUERY_CLIENT_PROFILE, QUERY_FRIENDSVISITS_TRAVELS } from '../../services/requests';


export default class CountryModalFriends extends React.Component {
    //map over the query, display friends and level of visit
    render() {
    return (
    <Table basic='very' celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{width: '40%'}}>Friends</Table.HeaderCell>
            <Table.HeaderCell style={{width: '40%'}}>Level of Visit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      <Table.Body>
        <Query query={QUERY_CLIENT_PROFILE}>
        {({ loading, error, data: {userId} }) => {
          return (
            <Query query={QUERY_FRIENDSVISITS_TRAVELS} variables={{ id: userId }}>
            {({ loading, error, data: {friends} }) => {
              console.log(friends)
              return friends.map(item => {
                return(
                <Table.Row>
                  <Table.Cell>
                        {item.name}
                  </Table.Cell>
                  <Table.Cell>{item.visits.map(item => {
                    if(item.level === 1) {
                      return 'Wishlist'
                    }
                    if(item.level === 2) {
                      return 'Transited'
                    }
                    if(item.level === 3) {
                      return 'Visited'
                    }
                    if(item.level === 4) {
                      return 'Lived'
                    }
                  })}</Table.Cell>
                </Table.Row>
                )
              })
              }
            }
            </Query>
          )
        }}
        </Query>
      </Table.Body>
    </Table>
    )}
}
