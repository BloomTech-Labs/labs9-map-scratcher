import React, { Component } from 'react'
import { Card, Image, Checkbox, Form, Input, Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { MUTATION_UPDATEUSER_PROFILE } from '../../services/requests'

export default class UserCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      joinDate: '2019',
      numFriends: 0,
      name: '',
      email: '',
      nickname: '',
      scratchingAutomated: null,
      isPrivate: null
    }
  }
  componentDidMount() {
    const user = this.props.user
    const { name, email, nickname, scratchingAutomated, isPrivate } = user
    this.setState({ name, email, nickname, scratchingAutomated, isPrivate })
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { joinDate, name, email, nickname, scratchingAutomated, isPrivate } = this.state
    return (
      <Card style={{ width: '50%', border: '1px solid blue', margin: '20px auto' }}>
        <Image src='/static/alpaca.png'
        style={{width: '50%', display: 'flex', alignSelf: 'center'}}
        />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in {joinDate}</span>
            </Card.Meta>
            <Mutation
              mutation={MUTATION_UPDATEUSER_PROFILE}
              variables={{id: this.props.user.id, name, nickname, email, scratchingAutomated, isPrivate }}
            >
              {updateUser => (
              <Form style={{paddingTop: '3%'}} onSubmit={updateUser}>
                <Form.Field>
                <label>Name</label>
                <Input
                  name="name"
                  onChange={this.handleChange}
                  placeholder={name}
                  type="text"
                  value={name}
                  required
                />
                </Form.Field>
                <Form.Field>
                <label>Email</label>
                <Input
                  name="email"
                  onChange={this.handleChange}
                  placeholder={email}
                  type="text"
                  value={email}
                  required
                />
                </Form.Field>
                <Form.Field>
                <label>Nickname</label>
                <Input
                  name="nickname"
                  onChange={this.handleChange}
                  placeholder={nickname}
                  type="text"
                  value={nickname}
                  required
                />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                    type='checkbox'
                    name='automateScratchOff'
                    onChange={() => this.setState({scratchingAutomated: !scratchingAutomated})}
                    checked={!!scratchingAutomated}
                    label="Automate Scratch-off"
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                    type='checkbox'
                    name='isPrivate'
                    onChange={() => this.setState({isPrivate: !isPrivate})}
                    checked={!!isPrivate}
                    label="Private User"
                    />
                </Form.Field>  
                <Form.Field>
                  <Button onClick={updateUser}>Submit</Button>
                </Form.Field>
              </Form>)}
            </Mutation>
        </Card.Content>
      </Card>
    )  
  }
} 
