

//== Root App Component ======================================================
/*
  This component is responsible for rendering the application's content. It is
  mostly concerned with Routing and Authentication redirects.
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
import AlpacaFacts from './components/AlpacaFacts/AlpacaFacts.js';

//-- Project Constants ---------------------------
//creates a rew instance of Auth to check the result of authentication
const auth = new Auth((result) => console.log('auth result', result), client)

//handleAuthentication is retrieved from the auth helper file and processes authentication logic.
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

//-- React Implementation ------------------------
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path='/' render={(props) => <Landing {...props}  login={auth.login} />} />
        <Route path='/friends/:id' render={(props) => authRedirect(props, Friends)} />
        <Route path='/profile' render={(props) => authRedirect(props, Profile)} />
        <Route path='/travels' render={(props) => authRedirect(props, Travels)} />
        <Route path='/callback' render={(props) => {
          handleAuthentication(props)
          return <AlpacaFacts {...props} />
        }} />
      </Fragment>
    );
  }
}


//== Subcomponents and Utilities ===============================================

/*-- Authorization Redirect ----------------------
  This function checks if the user has a valid token, and redirects to the
  landing page if they don't. If they do, then it returns JSX to render a
  component.
*/
function authRedirect(props, ComponentToRender) {
  // Check token validity
  const expire = localStorage.getItem('expires_at');
  const token = localStorage.getItem('access_token');
  const now = new Date().getTime();
  const valid = (token && (now < expire));
  // If the token isn't valid, redirect to the landing page
  if(!valid) {
    props.history.push('/');
    return <React.Fragment />
  }
  // Allow user to view content
  return <ComponentToRender {...props} login={auth.login} logout={auth.logout}/>
}
