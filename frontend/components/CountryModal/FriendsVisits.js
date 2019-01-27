import React, { Fragment, Component } from 'react';
import { List } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { QUERY_FRIENDSVISITS_MODAL } from '../../services/requests/modal';


export default class FriendsVisits extends Component {
  //map over the query, display friends and level of visit
  render() {
    return (
      <Query query={QUERY_FRIENDSVISITS_MODAL} variables={{ id: this.props.displayId }}>
      {({ loading: loadingFriends, error , data: { friends }}) => {
        if (loadingFriends) {
          return (<div>loading</div>)
        }
        if (error) {
          return (<div>error</div>)
        }
        let friendsList;
        if (friends) {
          let friendArray = [];
          friends.map(friend => {
            friend.visits.map(visit => {
              if (visit.country.id === this.props.id) {
                friendArray.push([friend.name, visit.level])
              }
            })
          })
          friendArray = friendArray.sort((a,b) => {
            return a[1] < b[1] ? 1 : -1
          })
          const icons = {
            1: 'paper plane',
            2: 'plane',
            3: 'marker',
            4: 'home'
          }
          friendsList = friendArray.map(friend => {
            friend[1] = icons[friend[1]];
            return friend;
          })
          return friendsList;
        }
        console.log('list', friendsList);
        return (
          <Fragment>
          <List>
            <List.Header>
              Friends
            </List.Header>
            {friendsList && friendsList.map(person => {
              const icon = person[1]
              return (
                <List.Item key={person[0]} icon={`${icon}`} content={person[0]}/>
              )
            })}
          </List>
        </Fragment>
        )
      }}
      </Query>
    )
  }
}
