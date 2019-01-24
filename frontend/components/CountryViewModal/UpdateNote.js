import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { MUTATION_UPDATEVISIT_MODAL } from '../../services/requests';
import { Button } from 'semantic-ui-react';

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
      <React.Fragment>
      <Mutation mutation={MUTATION_UPDATEVISIT_MODAL}>
        {(updateVisit, { data }) => (
          <form onSubmit={(e) => {
            e.preventDefault;
            updateVisit({variables: {visitId: this.props.visitId, note: this.state.note }})
          }}>
            <input
            type='textarea'
            name='note'
            value={this.state.note}
            onChange={this.handleChange}
            />
             <Button type='submit'>
             {this.props.note ? 'Update Note' : 'Add Note'}
             </Button>
          </form>
        )}
      </Mutation>
      </React.Fragment>
    )
  }

}
