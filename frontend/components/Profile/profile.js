import React, { Component } from 'react'
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'

import './profile.less'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      nickname: ''
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <Form className="profile_form">
        <Form.Field>
          <label>Name:</label>
          <Input
            name="name"
            onChange={this.handleChange}
            placeholder="name"
            type="text"
            value={this.state.name}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Email:</label>
          <Input
            name="email"
            onChange={this.handleChange}
            placeholder="email"
            type="text"
            value={this.state.email}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Nickname:</label>
          <Input
            name="nickname"
            onChange={this.handleChange}
            placeholder="nickname"
            type="text"
            value={this.state.nickname}
            required
          />
        </Form.Field>
        <div className="profile_checkbox">
          <Checkbox type="checkbox" name="automateScratchOff" value="" />
          &nbsp;&nbsp;Automate scratch off
        </div>
        <Button className="profile_button" onClick={e => e.preventDefault()}>
          Save
        </Button>
      </Form>
    )
  }
}
