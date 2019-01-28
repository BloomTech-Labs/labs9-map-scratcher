

//== Disabled Buttons ==========================================================
/*
  Please add documentation detailing the purpose and use of this component.
  Maybe DisabledButtons and CreateButtons should reside in the same file?
*/

//-- Dependencies --------------------------------
import React, {Component} from 'react';
import { Button, Segment, Confirm } from 'semantic-ui-react';

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
export default class DisabledButtons extends Component {
  render() {
    return (
      <Segment>
        {buttonTypes.map(button => {
          return (
            <Button
              key={button.level}
              inverted
              disabled
              color={button.color}

            >
              {button.content}
            </Button>
          );
        })}
      </Segment>
    );
  }
}
