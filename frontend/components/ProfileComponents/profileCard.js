import React from 'react'
import { Card, Icon, Image, Checkbox, Form, Input } from 'semantic-ui-react'

const UserCard = (props) => (
  <Card style={{ width: '100%', border: '1px solid blue', marginLeft: '15%' }}>
    <Image src='/static/alpaca.png'
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