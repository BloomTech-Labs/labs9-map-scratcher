import React from 'react'
import { List, Image } from 'semantic-ui-react'

const FriendsList = () => (
    <List>
        <List.Item>
        <Image avatar src='/static/alpaca.png' />
        <List.Content>
            <List.Header as='a'>Rachel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='/static/alpaca.png' />
        <List.Content>
            <List.Header as='a'>Lindsay</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='/static/alpaca.png' />
        <List.Content>
            <List.Header as='a'>Matthew</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='/static/alpaca.png' />
        <List.Content>
            <List.Header as='a'>Jenny Hess</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='/static/alpaca.png' />
        <List.Content>
            <List.Header as='a'>Veronika Ossi</List.Header>
        </List.Content>
        </List.Item>
    </List>
)

export default FriendsList