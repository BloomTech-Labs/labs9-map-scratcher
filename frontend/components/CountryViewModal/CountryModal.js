import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import CountryModalFriends from './CMfriends.js'
import CountryModalComment from './CMnote.js'
import LevelOfVisitButtons from './CMlevelOfVisit.js'
import CMheader from './CMheader.js'
import CMscratcher from './CMscratcher.js'
import './countryModal.less'

export default class CountryModal extends Component {

  render() {
    return (
      <Card>
        <Card.Content>
          <CMheader />
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
