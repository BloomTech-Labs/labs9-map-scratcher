import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default class Login extends Component {

	render() {
		return (
            <form>
                <div>
                    <h3>Login User</h3>
                    <input
                    type='text'
                    placeholder='username'
                    name='username'
                    value=''
                    />
                    <input
                    type='text'
                    placeholder='password'
                    name='password'
                    value=''
                    />
                    <div>
                    <Button color='twitter'>
                        <Icon name='twitter' /> Login with Twitter
                    </Button>
                    <button>Register</button>
                    </div>
                </div>
            </form>
		)
	}
}