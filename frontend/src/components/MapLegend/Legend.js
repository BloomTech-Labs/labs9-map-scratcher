

//== Legend ====================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react'
import {
  tan, grey, green, red, purple
} from '../Map/countryStyles';
import { Card, Form, Radio, Button } from 'semantic-ui-react'
import './legend.scss'

//-- React Implementation ------------------------
export default class Legend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      theme: green,
      value: ''
    }
    this.levels = [
      { 1: "Wishlist" },
      { 2: "Transited" },
      { 3: "Visited" },
      { 4: "Lived" }
    ]
  }

  toggleEditing = (prev) => {
    this.setState({editing: !prev})
  }

  changeTheme = (color) => {
    this.props.setTheme(color)
    this.setState({theme: color})
  }

  render() {
    return (
      <Card className="legend_main">
      {this.state.editing ? (
        <Card.Content>
          <Form className='form' name='colorOptions' onSubmit={() => this.toggleEditing(this.state.editing)}>
            <Form.Field name='colorOptions'>
              <Radio
                label='Red'
                name='colorOptions'
                value='red'
                checked={this.state.theme === red}
                onChange={() => this.changeTheme(red)}
              />
              <Radio
                label='Purple'
                name='colorOptions'
                value='purple'
                checked={this.state.theme === purple}
                onChange={() => this.changeTheme(purple)}
              />
              <Radio
                label='Green'
                name='colorOptions'
                value='green'
                checked={this.state.theme === green}
                onChange={() => this.changeTheme(green)}
              />
              <Radio
                label='Grey'
                name='colorOptions'
                value='grey'
                checked={this.state.theme === grey}
                onChange={() => this.changeTheme(grey)}
              />
              <Radio
                label='Tan'
                name='colorOptions'
                value='tan'
                checked={this.state.theme === tan}
                onChange={() => this.changeTheme(tan)}
              />
            </Form.Field>
            <Button 
              type='submit'
              className='legend-button'
              onClick={() => this.toggleEditing(this.state.editing)}
            >Save</Button>
          </Form>
        </Card.Content>
      ) : (
        <Card.Content>
          {this.levels.map(level => {
            let key = Object.keys(level)[0]
            let value = Object.values(level)[0]
            return (
              <div className='legend_div' key={key}>
              <div className='legend_box' style={{background: `${this.state.theme[key]}`}}></div>
              <Card.Content>{value}</Card.Content>
              </div>
            )}) 
          }
          <Button 
            className='legend-button'
            onClick={() => this.toggleEditing(this.state.editing)}
          >Edit Theme</Button>
        </Card.Content>
      )}
      </Card>
    )
  }
}
