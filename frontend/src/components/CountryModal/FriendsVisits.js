

//== Friends Visits ============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Fragment, Component } from 'react';
import { List, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { QUERY_FRIENDSVISITS_MODAL } from '../../services/requests/modal';


//-- React Implementation ------------------------
export default class FriendsVisits extends Component {
  //map over the query, display friends and level of visit
  render() {
    return (
      <Query query={QUERY_FRIENDSVISITS_MODAL} variables={{ id: this.props.displayId }}>
      {({ loading: loadingFriends, error , data: { friends }}) => {
        if (loadingFriends) {
          return (<Loader/>);
        }
        if (error) {
          return (<div>error</div>);
        }
        let friendsList;
        if (friends) {
          let friendArray = [];
          friends.forEach(friend => {
            friend.visits.forEach(visit => {
              if (visit.country.id === this.props.id) {
                return friendArray.push([friend.name, visit.level]);
              }
            });
          });
          friendArray = friendArray.sort((a,b) => {
            return (a[1] < b[1])? 1 : -1;
          });
          const icons = {
            1: 'paper plane',
            2: 'plane',
            3: 'marker',
            4: 'home'
          };
          friendsList = friendArray.map(friend => {
            friend[1] = icons[friend[1]];
            return friend;
          });
        }
        if (friendsList.length > 0) {
          return (
            <Fragment>
            <List>
              <List.Header>
                Friends' Visits
              </List.Header>
              {friendsList && friendsList.map(person => {
                const iconyas = person[1];
                return (
                  <List.Item key={person[0]} icon={iconyas} content={person[0]}/>
                );
              })}
            </List>
          </Fragment>
            );
        }
          return (
            <Fragment>
            <List>
              <List.Header>
                Friends' Visits
              </List.Header>
                  <List.Item content='Looks like none of your friends have interacted with this country yet. Be the first!'/>
            </List>
          </Fragment>
          )

      }}
      </Query>
    );
  }
}
