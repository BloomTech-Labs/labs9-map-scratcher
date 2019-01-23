import React from 'react'
import { Button, Segment } from 'semantic-ui-react'

export default class LevelOfVisitButtons extends React.Component {


    render() {
        return (
        <Segment>
            <Button inverted color='pink' style={{width: '23%', fontSize: '.55rem'}}>
            Wishlist
            </Button>
            <Button inverted color='yellow'  style={{width: '23%', fontSize: '.55rem'}}>
                Transited
            </Button>
            <Button inverted color='green'  style={{width: '23%', fontSize: '.55rem'}}>
                Visited
            </Button>
            <Button inverted color='blue'  style={{width: '23%', fontSize: '.55rem'}}>
                Lived
            </Button>
        </Segment>
        )
    }
}