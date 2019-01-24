import React from 'react'
import { List } from 'semantic-ui-react'
import { Query } from 'react-apollo';
import { QUERY_CLIENT_PROFILE, QUERY_FRIENDSVISITS_TRAVELS } from '../../services/requests';


export default class CountryModalFriends extends React.Component {
    //map over the query, display friends and level of visit
    render() {
    return (
        <Query query={QUERY_CLIENT_PROFILE}>
        {({loading: loadingUser, data: { userId }}) => {
          return (
            <Query query={QUERY_FRIENDSVISITS_TRAVELS} variables={{ id: userId }}>
            {({ loading: loadingFriends , data: { friends }}) => {
              let friendArray = [];
              friends.map(friend => {
                friend.visits.map(visit => {
                  if (visit.country.id === "cjqy9e28y00i20840rwy5l1ti") {
                    friendArray.push([friend.name, visit.level])
                  }
                })
              })
              friendArray = friendArray.sort((a,b) => {
                return a[1] < b[1] ? 1 : -1
              })
              console.log(friendArray);
              const icons = {
                1: 'paper plane',
                2: 'plane',
                3: 'marker',
                4: 'home'
              }
              let friendsList = friendArray.map(friend => {
                  friend[1] = icons[friend[1]];
                  return friend;
              })
              return (
                <List >
                  <List.Header>
                    Friends
                  </List.Header>
                  {friendsList.map(person => {
                    return (
                      <List.Item key={person[0]} icon={`${person[1]}`} content={`${person[0]}`}/>
                    )
                  })}
                </List>
              )
            }}
            </Query>
          )
        }}
        </Query>

    )}
}
