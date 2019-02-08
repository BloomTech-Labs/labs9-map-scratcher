

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
    const expire = localStorage.getItem('expires_at');
    const token = localStorage.getItem('access_token');

    const now = new Date().getTime()
    if (token && now < expire) {
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
        <div className='landing_mainContent'>
        <Backpaca />
        <h2>  Brag about your travels. Share your dreams. Discover your friends' notes about the places you've been and the places you want to go.</h2>
        </div>
      </div>
    );
  }
}
