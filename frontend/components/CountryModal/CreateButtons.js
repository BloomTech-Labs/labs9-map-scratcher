

//== Create Buttons ============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { MUTATION_CREATEVISIT_MODAL } from '../../services/requests/modal';

//-- Types of buttons to display -----------------
/* buttonTypes: An array of objects used to configure buttons. There is one
  object per visit level. Visit levels should probably be defined as constants
  in an external file, and referenced by name in all dependent files. */
const buttonTypes = [
  {level: 1, color: 'pink', content: 'Wishlist'},
  {level: 2, color: 'yellow', content: 'Transited'},
  {level: 3, color: 'green', content: 'Visited'},
  {level: 4, color: 'blue', content: 'Lived'},
];

//-- React Implementation ------------------------
export default class CreateButtons extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <Mutation mutation={MUTATION_CREATEVISIT_MODAL}>
        {(createVisit, { data }) => (
            <Segment>
            {buttonTypes.map(button => {
              return (
                <Button
                  key={button.level}
                  inverted
                  color={button.color}
                  value={button.level}
                  onClick={(e,data) => {
                    createVisit({ variables: {
                      userId: this.props.displayId,
                      countryId: this.props.countryId,
                      level: data.value,
                    }})
                  }}
                >
                {button.content}
                </Button>
              );
            })}
            </Segment>
        )}
        </Mutation>
      </Fragment>
    );
  }
}
