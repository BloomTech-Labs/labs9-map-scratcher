import React from 'react'

export default class CountryModalComment extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            note: ""
          }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }

    render() {
        return (
            //mutation to add note
            <textarea 
                style={{width: '100%'}} 
                name='note' 
                onChange={this.handleChange}
                placeholder='Note'>
            </textarea>
        )
    }
}