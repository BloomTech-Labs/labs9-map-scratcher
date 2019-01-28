

//== Landing Page ==============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import Login from './Login/Login.js';
import './landing.less';

//-- React Implementation ------------------------
export default class LandingPage extends Component {
  render() {
    return(
      <div className='landing_mainDiv'>
        <div className='landing_header'>
          <h1 className='landing_title'>Backpaca</h1>
          <Login />
        </div>
        <img src='../static/backpacaLogo.svg' />
        <div className='landing_mainContent'>
          Backpaca is a web application that allows users to brag about their travel experiences and plan future adventures with their friends.
        </div>
      </div>
    );
  }
}
