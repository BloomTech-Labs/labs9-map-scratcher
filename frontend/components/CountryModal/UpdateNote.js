import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo';
import { Button, Form, Input } from 'semantic-ui-react';
import { 
 
  MUTATION_UPDATEVISIT_MODAL } from '../../services/requests/modal';

export default class UpdateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
    }
  }

  componentDidMount() {
    if (this.props.note) {
      this.setState({
        note: this.props.note,
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Fragment>
        <Mutation 
          mutation={MUTATION_UPDATEVISIT_MODAL}
          variables={{id: this.props.visitId, note: this.state.note }}
        >
          {updateVisit => (
            <Form onSubmit={updateVisit}>
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
    )
  }

}