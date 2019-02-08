

//== Header ====================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react'
import { Button, Icon, Menu } from 'semantic-ui-react'
import { Query, Mutation } from 'react-apollo'
import {
  QUERY_COUNTRYID_MODAL,
  MUTATION_CLOSEMODAL_MODAL } from '../../services/requests/modal'

//-- React Implementation ------------------------
export default class Header extends Component {
  render() {
    const { activeItem } = this.props.activeItem;
    return (
      <Query query={QUERY_COUNTRYID_MODAL} variables={{id: this.props.id}}>
        {({ loading, data: {countryById} }) => {
          if (loading) {
            return <div>Loading</div>
          }
          return (
            <React.Fragment>
            <Mutation mutation={MUTATION_CLOSEMODAL_MODAL}>
              {closeModal => (
                <Button
                size='tiny' onClick={closeModal}>
                <Icon name="world"/>Return to Map</Button>
              )}
            </Mutation>
            <p>{countryById.name}</p>
            <Menu pointing secondary className='modal_header'>
            <Menu.Item
              name='scratcher'
              active={activeItem === 'scratcher'}
              onClick={this.props.toggleView}
              />
            <Menu.Item
              name='note'
              active={activeItem === 'note'}
              onClick={this.props.toggleView}
            />
            <Menu.Item
              name='friends'
              active={activeItem === 'friends'}
              onClick={this.props.toggleView}
              />
            </Menu>

            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
