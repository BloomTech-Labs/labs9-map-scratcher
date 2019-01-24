import React, {Component} from 'react';
import { Button, Segment, Confirm } from 'semantic-ui-react';

const buttons = [{level: 1, color: 'pink', content: 'Wishlist'}, {level: 2, color: 'yellow', content: 'Transited'}, {level: 3, color: 'green', content: 'Visited'}, {level: 4, color: 'blue', content: 'Lived'},]

export default class DisabledButtons extends Component {
  render() {
    return (
      <Segment>
        {buttons.map(button => {
          return (
            <Button
              key={button.level}
              inverted
              disabled
              color={button.color}
              style={{width: '23%', fontSize: '.55rem'}}
            >
              {button.content}
            </Button>
          )
        })}
      </Segment>
    )
  }
}
