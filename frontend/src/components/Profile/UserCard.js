
//== User Card =================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react'
import { Card, Image, Checkbox, Form, Input, Button, Icon } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import {
  MUTATION_UPDATEUSER_PROFILE,
  MUTATION_DELETEUSER_PROFILE } from '../../services/requests/profile'
import './profile.scss'

//== React Implementation ======================================================

//-- React Life-cycle ----------------------------
export default class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinDate: '2019',
      numFriends: 0,
      name: '',
      email: '',
      bio: '',
      pictureUrl: '',
      scratchingAutomated: null,
      isPrivate: null,
      editing: false
    };
  }
  componentDidMount() {
    const user = this.props.user;
    this.setState({
      name: user.name,
      email: user.email,
      scratchingAutomated: user.scratchingAutomated,
      isPrivate: user.isPrivate,
      pictureUrl: user.pictureUrl,
      bio: user.bio
    });
  }

  //-- Interaction ---------------------------------
  handleChange = changeEvent => {
    return this.setState({
      [changeEvent.target.name]: changeEvent.target.value,
    });
  }

  //uploads the image and sends back the url of the uploaded image
  uploadWidget = (e) => {
    e.preventDefault()
    window.cloudinary.openUploadWidget({
      cloud_name: 'dr9p6aaos',
      upload_preset: 'vchytrzk'},
      (error, result) => {
        if(result) {
        this.setState({ pictureUrl: result[0].secure_url })
        }
      }
    )
  }

  //toggles whether the form is editable
  toggleEditing = () => {
    this.setState({ editing: !this.state.editing })
  }


  //-- Rendering -----------------------------------
  render() {
    const { joinDate, name, email, scratchingAutomated, isPrivate, editing, pictureUrl, bio } = this.state;
    const visitCount = this.props.user.visits.length
    return (
      <Card className='profile_userCardMain'>
        <Icon className='edit outline' onClick={this.toggleEditing}/>
          {editing ? (
            <Card.Content>
              <Mutation
              mutation={MUTATION_UPDATEUSER_PROFILE}
              variables={{id: this.props.user.id, name, email, scratchingAutomated, isPrivate, pictureUrl, bio }}
            >
              {updateUser => (
              <Form
                className='profile_userCardForm'
                onSubmit={() => {
                  updateUser()
                  this.toggleEditing()
                }}>
                <Form.Field>
                <label>Name</label>
                <Input
                  name="name"
                  onChange={this.handleChange}
                  placeholder={name}
                  type="text"
                  value={name}
                  required
                  className='profile_userCardInput'
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
                  className='profile_userCardInput'
                />
                </Form.Field>
                <Form.Field>
                <label>Bio</label>
                <Input
                  name="bio"
                  onChange={this.handleChange}
                  placeholder={bio}
                  type="text"
                  value={bio}
                  required
                  className='profile_userCardInput'
                />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                  type='checkbox'
                  name='automateScratchOff'
                  slider
                  onChange={() => this.setState({scratchingAutomated: !scratchingAutomated})}
                  checked={!!scratchingAutomated}
                  label="Automate Scratch-off"
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                  type='checkbox'
                  name='isPrivate'
                  slider
                  onChange={() => this.setState({isPrivate: !isPrivate})}
                  checked={!!isPrivate}
                  label="Private User"
                  />
                </Form.Field>
                <Form.Field>
                  <Button className='submit'
                    color='linkedin'
                    fluid
                    onSubmit={() => {
                      updateUser()
                      this.toggleEditing()
                    }}
                  >Submit</Button>
                </Form.Field>
              </Form>)}
            </Mutation>
            <div className='profile_editButtons'>
            <Button className='upload' fluid onClick={this.uploadWidget}>Upload Profile Picture </Button>
            <Mutation mutation={MUTATION_DELETEUSER_PROFILE} variables={{id: this.props.user.id}}>
              {deleteUser => (
              <Button className='delete' fluid label='This cannot be undone!' content='Delete Account' onClick={deleteUser}>Delete Account</Button>
              )}
            </Mutation>
            </div>
            </Card.Content>
          ) : (
            <Fragment>
              <Image src={pictureUrl === '' ? '/static/alpaca.png' : pictureUrl} className='profile_userCardProfilePic' />
              <Card.Content>
                <Card.Header id='card-header'>{name}</Card.Header>
                <Card.Meta>
                  <div className='card-meta'>{bio}</div>
                  <div className='card-meta'>Joined in {joinDate}</div>
                  <div className='card-meta'>{visitCount === 1 ? `${visitCount} Visit` : `${visitCount} Visits`}</div>
              </Card.Meta>
                <div className='user-preferences'>
                  <div>{scratchingAutomated ? 'Automated Scratchoff' : 'Manual Scratchoff'}</div>
                  <div>{isPrivate ? 'Private User' : 'Public User'}</div>
                </div>
                <Button
                  fluid
                  onClick={() => this.props.history.push('/travels')}
                >Go to your travels</Button>
              </Card.Content>
            </Fragment>
          )}
      </Card>
    );
  }
}
