import React, { Component } from 'react'
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'

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
            <Form style={this.form}>
                <div>
                    <p style={this.giveMeSpace}>Email:
                        <Input
                        style={this.textSpacing}
                        type='text'
                        placeholder='email'
                        name='email'
                        value=''
                        />
                    </p>
                    <p style={this.giveMeSpace}>
                        <Checkbox
                        style={{paddingRight: '5%'}}
                        type='checkbox'
                        name='automateScratchOff'
                        value=''
                        />
                         &nbsp;&nbsp;Automate scratch off
                    </p>
                    <p style={this.giveMeSpace}>Old Password:
                        <Input
                        style={this.textSpacing}
                        type='text'
                        placeholder='old password'
                        name='oldpassword'
                        value=''
                        />
                    </p>
                    <p style={this.giveMeSpace}>New Password:
                        <Input
                        style={this.textSpacing}
                        type='text'
                        placeholder='new password'
                        name='newpassword'
                        value=''
                        />
                    </p>
                    <div>
                        <Button style={this.buttonStyle} onClick={(e) => e.preventDefault()}>Save</Button>
                    </div>
                </div>
            </Form>
		)
	}
}