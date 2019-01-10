import React, { Component } from 'react'

export default class Login extends Component {

    buttonStyles = {
        'margin': '.5% 3% 0% 4%',
    }

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
                    <button style={this.buttonStyles}>Log in</button>
                    <button>Register</button>
                    </div>
                </div>
            </form>
		)
	}
}