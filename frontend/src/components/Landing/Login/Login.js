

//== Login =====================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import '../landing.scss';
// import Auth from '../../services/Authentication/auth/auth';

//-- Project Constants ---------------------------

//-- React Implementation ------------------------
export default class Login extends Component {
  render() {
    return (
      <div className='login_loginButton'>
          <Button className='login' onClick={() => this.props.login()}>
           Login or SignUp
          </Button>
      </div>
    );
  }
}
