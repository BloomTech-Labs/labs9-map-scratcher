import React from 'react'
import { Card, Table, Segment, Button, Header, Image } from 'semantic-ui-react'
import Scatcher from '../Scratcher/index.js'

const CardExampleCard = () => (
  <Card style={{marginLeft: '30%'}}>
    <Card.Content style={{textAlign: 'center'}}>
      <Card.Header style={{paddingBottom: '5%'}}><i class='pe flag'/>Peru</Card.Header>
      <div style={{height: '200px'}}>
        <Scatcher scratchable={true} urlMap={`/static/peru.png`} urlFlag={`/static/pe-flag-min.jpg`} colorOutline={'cyan'} colorScratch={'silver'} handleScratchAll={() => console.log('working')} handleLoadingError={() => console.log('cannot load image')} style={{ height: '200px' }}/>
      </div>
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
      <textarea style={{width: '100%'}}></textarea>
      <Table basic='very' celled >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{width: '40%'}}>Friends</Table.HeaderCell>
        <Table.HeaderCell style={{width: '40%'}}>Level of Visit</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
              Lena
        </Table.Cell>
        <Table.Cell>Wishlist</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
              Matthew
        </Table.Cell>
        <Table.Cell>Lived</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
              Lindsay
        </Table.Cell>
        <Table.Cell>Visited</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
              Mark
        </Table.Cell>
        <Table.Cell>Transited</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
    </Card.Content>
  </Card>
)

export default CardExampleCard


//     scratchable(boolean) - What kind of map to display. Options are:
//         True - Display a scratchable map with flag overlay
//         False - Display a simple colored map.
//     urlMap(string/URL) - An image specifying the shape of the component.
//     urlFlag(string/URL) - An image to be overlaid on the map shape.
//     colorOutline(string/color) - The map shape is outlined in this color.
//     colorScratch(string/color) - Scratching the image reveals this color.
//     handleScratchAll(function) - A callback to invoke once fully scratched.
//     handleLoadingError(function) - A callback invoked if images can't load.