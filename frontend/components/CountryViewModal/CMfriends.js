import React from 'react'
import { Table } from 'semantic-ui-react'


export default class CountryModalFriends extends React.Component {
    //map over the query, display friends and level of visit
    render() {
    return (
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
    )}
}