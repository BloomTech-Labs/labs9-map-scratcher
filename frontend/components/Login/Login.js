import React, { Component } from 'react'
import { Button, Icon, Input } from 'semantic-ui-react'

const login =
  process.env.NODE_ENV === 'production'
    ? 'https://backpaca-yoga.herokuapp.com/auth'
    : 'http://localhost:4000/auth'

export default class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <div>
            <h3>Login User</h3>
            <Input
              type="text"
              placeholder="username"
              name="username"
              value=""
            />
            <Input
              type="text"
              placeholder="password"
              name="password"
              value=""
            />
            <div>
              <Button>Register</Button>
            </div>
          </div>
        </form>
        <a href={`${login}/twitter`}>
          <Button color="twitter">
            <Icon name="twitter" /> Login with Twitter
          </Button>
        </a>
      </div>
    )
  }
}
