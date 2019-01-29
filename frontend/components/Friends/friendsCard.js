import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

export default class Friends extends React.Component {
    constructor(props) {
        super(props)
    }

    Id = this.props.id

    numFriends = (
        <a>
            <Icon name='user'/>
            16 friends
        </a>
    )


    render() {
        return (
            <div>
                <Card 
                image='/static/alpaca.png'
                header={this.Id}
                meta='friends?'
                description='TBD, should we add this?'
                extra={this.numFriends}
                />
            </div>
        )
    }

}
