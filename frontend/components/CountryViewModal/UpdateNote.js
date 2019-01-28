

//== Update Note ===============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo';
import { Button, Form, Input } from 'semantic-ui-react';
import { 
  QUERY_VIEWING_MODAL, 
  QUERY_USERVISITS_MODAL, 
  MUTATION_UPDATEVISIT_MODAL,
} from '../../services/requests';

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
    return (
      <Fragment>
        <Mutation 
          mutation={MUTATION_UPDATEVISIT_MODAL}
          variables={{id: this.props.visitId, note: this.state.note }}
          refetchQueries={[
            {query: QUERY_VIEWING_MODAL}, 
            {query: QUERY_USERVISITS_MODAL, variables: {id: this.props.displayId}}
          ]}
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
    );
  }
}
