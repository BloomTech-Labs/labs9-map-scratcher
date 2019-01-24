import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import CountryModalFriends from './CMfriends.js'
import CountryModalComment from './CMnote.js'
import LevelOfVisitButtons from './CMlevelOfVisit.js'
import CMheader from './CMheader.js'
import CMscratcher from './CMscratcher.js'

export default class countryModal extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Card style={{marginLeft: '30%'}}>
        <Card.Content style={{textAlign: 'center'}}>
          <CMheader id={this.props.countryId} />
          <CMscratcher />
          <LevelOfVisitButtons />
          {/* have both a textarea note and paragraph note; ternary for classname to show only the relevant one depending on userType */}
          <CountryModalComment />
          <CountryModalFriends />
        </Card.Content>
      </Card>
    )
  }
}
