import React from 'react'
import { Card, Feed } from 'semantic-ui-react'

const Legend = () => (
  <Card style={{zIndex: '500', position: 'absolute', bottom: '3%', left: '93%', width: '6%', background: 'grey'}}>
    <Card.Content>
      {/* <Card.Header style={{textAlign: 'center'}}>Legend</Card.Header> */}
      <div style={{display: 'flex', alignItems: 'baseline', paddingTop: '3%', alignContent: 'center'}}>
      <div style={{border: '1px solid pink', width: '1rem', height: '1rem', marginRight: '5%', background: 'pink'}}></div>
      <Card.Content>Wishlist</Card.Content>
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', paddingTop: '3%'}}>
      <div style={{border: '1px solid yellow', width: '1rem', height: '1rem', marginRight: '5%', background: 'yellow'}}></div>
      <Card.Content>Transited</Card.Content>
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', paddingTop: '3%'}}>
      <div style={{border: '1px solid green', width: '1rem', height: '1rem', marginRight: '5%', background: 'green'}}></div>
      <Card.Content>Visited</Card.Content>
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', paddingTop: '3%'}}>
      <div style={{border: '1px solid blue', width: '1rem', height: '1rem', marginRight: '5%', background: 'blue'}}></div>
      <Card.Content>Lived</Card.Content>
      </div>
    </Card.Content>
  </Card>
)

export default Legend;
