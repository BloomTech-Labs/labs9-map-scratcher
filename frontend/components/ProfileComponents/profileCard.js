import React from 'react'
import { Card, Icon, Image, Checkbox, Form, Input } from 'semantic-ui-react'

const UserCard = (props) => (
  <Card style={{ width: '30%', border: '1px solid blue', marginLeft: '15%' }}>
    <Image src='https://trello-attachments.s3.amazonaws.com/5c339966c4303f3b109d56f9/5c419cadf85fe45e2a368bee/d0d7f17054aaca45385217dc5ca22f44/alpaca.png'
    style={{width: '50%', display: 'flex', alignSelf: 'center'}}
    />
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
        <Card.Meta>
            <span className='date'>Joined in {props.joinDate}</span>
        </Card.Meta>
      {/* Form for editing name, email, nickname */}
        <Form>
            <Form.Field>
            <label>Name:</label>
            <Input
                name="name"
                onChange={props.handleChange}
                placeholder={props.name}
                type="text"
                value={props.name}
                required
            />
            </Form.Field>
            <Form.Field>
            <label>Email:</label>
            <Input
                name="email"
                onChange={props.handleChange}
                placeholder={props.email}
                type="text"
                value={props.email}
                required
            />
            </Form.Field>
            <Form.Field>
            <label>Nickname:</label>
            <Input
                name="nickname"
                onChange={props.handleChange}
                placeholder={props.nickname}
                type="text"
                value={props.nickname}
                required
            />
            </Form.Field>
        </Form>
      <div>
        <Checkbox
        type='checkbox'
        name='automateScratchOff'
        value={props.automateScratch}
        />
        &nbsp;&nbsp;Automate scratch off
      </div>
    </Card.Content>
        <Card.Content extra>
        <a>
            <Icon name='user' />
            {props.numFriends} Friends
        </a>
        </Card.Content>
  </Card>
)

export default UserCard