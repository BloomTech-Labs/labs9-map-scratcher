import React, { Component } from 'react'
import { Button, Icon, Input } from 'semantic-ui-react'

export default class Login extends Component {

	render() {
		return (
            <form>
                <div>
                    <h3>Login User</h3>
                    <Input
                    type='text'
                    placeholder='username'
                    name='username'
                    value=''
                    />
                    <Input
                    type='text'
                    placeholder='password'
                    name='password'
                    value=''
                    />
                    <div>
                    <Button color='twitter'>
                        <Icon name='twitter' /> Login with Twitter
                    </Button>
                    <Button>Register</Button>
                    </div>
                </div>
            </form>
		)
	}
}