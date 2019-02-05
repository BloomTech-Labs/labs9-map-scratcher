

//== Root App Component ======================================================
/*
    This component is responsible for rendering the application's content
*/

//-- Dependencies --------------------------------
import React, { Component, Fragment } from 'react';
import client from './services/createApolloClient.js';
import Auth from './services/auth/auth';
import { Route } from 'react-router-dom';
import './sass/index.scss';
import Landing from './pages/landing';
import Friends from './pages/friends';
import Profile from './pages/profile';
import Travels from './pages/travels';
import Callback from './components/Callback/Callback';

//-- Project Constants ---------------------------
//creates a rew instance of Auth to check the result of authentication
const auth = new Auth((result) => console.log('auth result', result), client)

//handleAuthentication is retrieved from the auth helper file and processes authentication logic.
const handleAuthentication = (nextState, replace) => {
  console.log(nextState.location.hash)
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}
//== React Specific ============================================================

//-- Initialization and Definition -----------------

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path='/' render={(props) => <Landing {...props}  login={auth.login} />} />
        <Route path='/friends/:id' render={(props) => <Friends {...props} logout={auth.logout}/>} />
        <Route path='/profile' render={(props) => <Profile {...props} logout={auth.logout}/>} />
        <Route path='/travels' render={(props) => <Travels {...props} logout={auth.logout}/>} />
        <Route path='/callback' render={(props) => {
          handleAuthentication(props)
          return <Callback{...props} />
        }} />
      </Fragment>
    );
  }
}

export default App;
