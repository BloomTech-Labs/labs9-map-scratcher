import React from 'react'
import { Query, Mutation } from 'react-apollo';
import { QUERY_CLIENT_PROFILE } from '../../services/requests';
import { Button } from 'semantic-ui-react'

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

    handleAddNote(e) {
     e.preventDefault()
     console.log('hello') 
    }


    render() {
        return (
            //mutation to add note
            <Query query={QUERY_CLIENT_PROFILE}>
            {({ loading: loadingUserId, data: { userId } }) => {
                // console.log(userId)
                return (
                <div>
                    <textarea 
                        style={{width: '100%'}} 
                        name='note' 
                        onChange={this.handleChange}
                        placeholder='Note'>
                    </textarea>
                    <Button onClick={this.handleAddNote}>Add note</Button>
                </div>
                )
            }}
            </Query>
        )
    }
}
