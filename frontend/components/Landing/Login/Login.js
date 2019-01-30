

//== Login =====================================================================
/*
  Please add documentation detailing the purpose and use of this component.
*/

//-- Dependencies --------------------------------
import React, { Component } from 'react';
import { Button, Icon, Input } from 'semantic-ui-react';
import '../landing.less';

//-- Project Constants ---------------------------
// Consider importing this from another file that manages environment logic.
// Dev URL is broken, as port isn't always 4000
const login =
  (process.env.NODE_ENV === 'production')
    ? 'https://backpaca-yoga.herokuapp.com/auth'
    : 'http://localhost:4000/auth';

//-- React Implementation ------------------------
export default class Login extends Component {
  render() {
    return (
      <div className='login_loginButton'>
        <a href={`${login}/twitter`}>
          <Button color="twitter" className='login_twitterButton'>
            <Icon name="twitter" /> Login with Twitter
          </Button>
        </a>
        <a>
          <Button className='login_registerButton'>
            Register
          </Button>
        </a>
      </div>
    );
  }
}
