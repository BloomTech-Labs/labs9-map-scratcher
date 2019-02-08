

//== Profile Page ==============================================================
/*
  [Insert Documentation here]
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { Menu, Card } from 'semantic-ui-react';
import {
  QUERY_USERS_PROFILE,
  QUERY_ME_PROFILE
} from '../services/requests/profile';
import { Dimmer, Loader } from 'semantic-ui-react';
import UserCard from '../components/Profile/UserCard';
import Header from '../components/ProfileHeader/ProfileHeader';
import FriendsList from '../components/Profile/FriendsList';
import VisitsChart from '../components/Profile/VisitsChart';
import '../components/Profile/profile.scss';

//-- React Implementation ------------------------

export default class Profile extends Component {
  state = {
    activeItem: 'userCard'
  }

  toggleView = (event, { name }) => {
    this.setState({
      activeItem: name
    })
  }
  render() {
    const { activeItem } = this.state
    return (
        <div className='profile_pageContainer'>
            {/* #region UserCard component */}
              <Query query={QUERY_ME_PROFILE} >
              {({ loading: loadingUser, error, data: { me } }) => {
                if (loadingUser) {
                  return (
                    <Dimmer active>
                      <Loader />
                    </Dimmer>
                  )
                }
                if (error) {
                  return <div>Whoops!</div>
                }
                return (
                  <Fragment>
                  {/* #region Header component */}
                    <Query query={QUERY_USERS_PROFILE}>
                    {({ loading: loadingUsers, data: {users} }) => {
                      if (loadingUser || loadingUsers) {
                        return (
                          <Dimmer active>
                            <Loader />
                          </Dimmer>
                        )
                      }
                      return (
                        <Header userId={me.id} users={users} logout={this.props.logout} {...this.props}/>
                      );
                    }}
                    </Query>
                  {/* #endregion Header component end */}
                  <div className='profile_content'>
                  <Menu pointing secondary className='profile_menu'>
                    <Menu.Item
                      name='userCard'
                      active={activeItem === 'userCard'}
                      onClick={this.toggleView}
                      />
                    <Menu.Item
                      name='visitsChart'
                      active={activeItem === 'visitsChart'}
                      onClick={this.toggleView}
                    />
                    <Menu.Item
                      name='friendList'
                      active={activeItem === 'friendList'}
                      onClick={this.toggleView}
                      />
                    </Menu>
                    <Card.Content>
                      {this.state.activeItem === 'visitsChart' &&  <VisitsChart user={me} />}
                      {this.state.activeItem === 'userCard' && <UserCard user={me} {...this.props} />}
                      {this.state.activeItem === 'friendList' && <FriendsList userId={me.id} friends={me.friends} />}
                    </Card.Content>
                  </div>
                  </Fragment>
                );
              }}
              </Query>
            {/* #endregion UserCard component */}
        </div>
    );

  }
}
