

//== Country Modal =============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import FriendsVisits from './FriendsVisits';
import Note from './Note';
//import LevelOfVisit from './LevelOfVisit';
import Header from './Header';
//import Scratcher from './Scratcher';
import { QUERY_CLIENT_MODAL } from '../../services/requests/modal';
import './countryModal.scss'
import ScratchHandler from './ScratchHandler.js';
import ClearVisitButton from './ClearVisitButton';

//-- React Implementation ------------------------
export default class CountryModal extends Component {
  state = {
    activeItem: 'scratcher'
  }

  toggleView = (event, { name }) => {
    this.setState({
      activeItem: name
    })
  }
  render() {
    // const { activeItem } = this.state;
    return (
      <Query query={QUERY_CLIENT_MODAL}>
      {({ loading, data }) => {
        if (loading) {
          return null;
        }
        let displayId, disabled
        if (data.viewingFriend) {
          displayId = data.friendId
          disabled = true;
        }
        if (!data.viewingFriend) {
          displayId = this.props.userId
          disabled = false
        }
        return (
          <div className='modal'>
            <Card.Content>
              <Header id={data.countryId} toggleView={this.toggleView} activeItem={this.state.activeItem} />
              <div className='content'>
                {this.state.activeItem === 'scratcher' &&
                  <ScratchHandler
                    countryId={data.countryId}
                    displayId={displayId}
                    disabled={disabled}
                    theme={this.props.theme}
                  />
                  
                }
                {this.state.activeItem === 'note' &&
                  <Note
                    countryId={data.countryId}
                    displayId={displayId}
                    disabled={disabled}
                  />
                }
                {this.state.activeItem === 'friends' &&
                  <FriendsVisits
                    id={data.countryId}
                    displayId={displayId}
                  />
                }
                <div className='delete'>
                  <ClearVisitButton
                    countryId={data.countryId}
                    userId={data.userId}
                    friendId={data.friendId}
                    disabled={disabled}
                    {...this.props}
                  />
                </div>
              </div>
            </Card.Content>
          </div>
        );
      }}
      </Query>
    );
  }
}


//== Diagnostic Info ===========================================================

//example set of console.logs for displayId is a friendId:
// {userId: "cjqt5c95y00s40894zs7m6q4v", viewingFriend: true, friendId: "cjqt5d9ox00sl0894ur6k9qza", viewBorders: false}
// CountryModal.js:23 friend in play cjqt5d9ox00sl0894ur6k9qza
// CountryModal.js:30 id just before return cjqt5d9ox00sl0894ur6k9qza
// CMnote.js:14 props {countryId: "cjqy9e28y00i20840rwy5l1ti", displayId: "cjqt5d9ox00sl0894ur6k9qza", disabled: true}
// CMnote.js:24 user undefined
// CMnote.js:33 undefined

//same console.logs when it is a userid:
// {userId: "cjqt5c95y00s40894zs7m6q4v", viewingFriend: false, friendId: null, viewBorders: false}
// CountryModal.js:26 viewing me
// CountryModal.js:30 id just before return cjqt5c95y00s40894zs7m6q4v
// CMlevelOfVisit.js:26 in the buttons {visits: Array(5), __typename: "User"}
// CMlevelOfVisit.js:35 [{…}]
// UpdateButtons.js:14 update buttons
// CMnote.js:14 props {countryId: "cjqy9e28y00i20840rwy5l1ti", displayId: "cjqt5c95y00s40894zs7m6q4v", disabled: false}
// CMnote.js:24 user {visits: Array(5), __typename: "User"}
// CMnote.js:33 [{…}]
// CMnote.js:45 Excellend christmas markets and do NOT miss the paprika sausage.
