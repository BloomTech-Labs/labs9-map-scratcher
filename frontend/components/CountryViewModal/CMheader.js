import React from 'react'
import { Card } from 'semantic-ui-react'

export default class CMheader extends React.Component {
    render() {
        return (
            //query on click which country we are looking at
            <Card.Header style={{paddingBottom: '5%'}}><i class='pe flag'/>Peru</Card.Header>
        )
    }
}