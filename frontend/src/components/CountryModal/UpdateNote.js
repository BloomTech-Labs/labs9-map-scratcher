

//== Update Note ===============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo';
import { Button, Form, Input } from 'semantic-ui-react';
import { MUTATION_UPDATEVISIT_MODAL, QUERY_USERVISITS_MODAL } from '../../services/requests/modal';

//-- React Implementation ------------------------
export default class UpdateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
    };
  }

  componentDidMount() {
    if (this.props.note) {
      this.setState({
        note: this.props.note,
      });
    }
  }

  handleChange = (changeEvent) => {
    this.setState({
      [changeEvent.target.name]: changeEvent.target.value
    });
  }

  render() {
    const { visitId, displayId } = this.props
    return (
      <Fragment>
        <Mutation
          mutation={MUTATION_UPDATEVISIT_MODAL}
          variables={{id: visitId, note: this.state.note}}
          update={(cache, {data: {updateVisit}}) => {
            const data = cache.readQuery({ query: QUERY_USERVISITS_MODAL, variables: {id: displayId } });
            const visits = data.user.visits
            const note = updateVisit.note
            cache.writeQuery({
              query: QUERY_USERVISITS_MODAL,
              variables: {id: data.user},
              data: {user: {visits: visits.map(v => v.id === visitId ? {...v, note} : v), __typename: 'Visit'}}
            });
          }}
        >
          {updateVisit => (
            <Form onSubmit={updateVisit}>
              <h3>Country Notes</h3>
              <Input
                type='textarea'
                name='note'
                placeholder={this.state.note}
                value={this.state.note}
                onChange={this.handleChange}
              />
              <Button type='submit'>
              {this.props.note ? 'Update Note' : 'Add Note'}
              </Button>
            </Form>
          )}
        </Mutation>
      </Fragment>
    );
  }
}
