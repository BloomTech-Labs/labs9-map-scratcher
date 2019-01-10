import React, { Component } from 'react'

export default class Settings extends Component {

    form = {
        'margin-left': '20%',
        'margin-top': '5%',
    }

    buttonStyle = {
        'margin-left': '15%'
    }

    giveMeSpace = {
        'margin': '5% 0%'
    }

    textSpacing = {
        'margin-left': '5%'
    }


	render() {
		return (
            <form style={this.form}>
                <div>
                    <p style={this.giveMeSpace}>Email:
                        <input
                        style={this.textSpacing}
                        type='text'
                        placeholder='email'
                        name='email'
                        value=''
                        />
                    </p>
                    <p style={this.giveMeSpace}>
                        <input
                        type='checkbox'
                        name='automateScratchOff'
                        value=''
                        />
                        Automate scratch off
                    </p>
                    <p style={this.giveMeSpace}>Old Password:
                        <input
                        style={this.textSpacing}
                        type='text'
                        placeholder='old password'
                        name='oldpassword'
                        value=''
                        />
                    </p>
                    <p style={this.giveMeSpace}>New Password:
                        <input
                        style={this.textSpacing}
                        type='text'
                        placeholder='new password'
                        name='newpassword'
                        value=''
                        />
                    </p>
                    <div>
                        <button style={this.buttonStyle} onClick={(e) => e.preventDefault()}>Save</button>
                    </div>
                </div>
            </form>
		)
	}
}