

//== Landing Page ==============================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import Login from './Login/Login.js';
import Backpaca from './Backpaca';
import './landing.scss';

//-- React Implementation ------------------------
export default class LandingPage extends Component {

  getToken = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.props.history.push('/profile')
    }
  }
  componentDidMount() {
    this.getToken();
  }

  render() {
    return(
      <div className='landing_mainDiv'>
        <div className='landing_header'>
          <h1 className='landing_title'>Backpaca</h1>
          <Login login={this.props.login} logout={this.props.logout}/>
        </div>
        <Backpaca />
        <div className='landing_mainContent'>
          Backpaca is a web application that allows users to brag about their travel experiences and plan future adventures with their friends.
        </div>
      </div>
    );
  }
}
