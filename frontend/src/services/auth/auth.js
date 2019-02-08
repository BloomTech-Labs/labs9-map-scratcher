

//== auth ======================================================
/*
    This file handles the Auth0Lock render logic, as well as the work of sending the information to the backend
*/

//-- Dependencies --------------------------------
import Auth0Lock from 'auth0-lock'
import gql from 'graphql-tag'
import { AUTH_CONFIG } from './auth0-variables'

//graphql mutation to send to the backend
const AUTHENTICATE = gql`
    mutation authenticate($idToken: String!) {
      authenticate(idToken: $idToken) {
        id
        name
        email
      }
    }
`

//sets up the Auth class with configuration options.
class Auth {
  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    oidcConformant: true,
    autoclose: true,
    auth: {
      sso: false,
      redirectUrl: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      audience: AUTH_CONFIG.api_audience,
      params: {
        scope: `openid profile email user_metadata app_metadata picture`
      }
    },
  })

  constructor(cb, apolloClient) {
    this.handleAuthentication()
    // binds functions to keep this context
    this.apolloClient = apolloClient
    this.cb = cb.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login() {
    // Call the show method to display the Lock widget.
    console.log('lock', this.isAuthenticated())
    this.lock.show()
  }

//set callbacks for Auth0Lock
  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession.bind(this))
    // Add a callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', err => {
      alert(`Error: ${err.error}. Check the console for further details.`)
      const data = { status: `error`, errMessage: err.error }
      this.cb(data)
    })
  }

//process result of authentication
  setSession(authResult) {
    //if everything went well, save the token to localStorage.
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
      )
      localStorage.setItem('access_token', authResult.accessToken)
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('expires_at', expiresAt)
      //send authenticate mutation with the resulte of the Auth0 flow
      const data = {
        status: `success`,
        accessToken: authResult.accessToken,
        idToken: authResult.idToken,
        expiresAt
      }
      this.signinOrCreateAccount({ ...data })
      this.cb(data)
    }
  }

//send authenticate mutation
  signinOrCreateAccount({ accessToken, idToken, expiresAt }) {
    this.apolloClient
        .mutate({
          mutation: AUTHENTICATE,
          variables: { idToken }
        })
        //check to see if we are on the callback page. if so, redirect to landing page. if not, reload current window
        .then(res => {
          if (window.location.href.includes(`callback`)) {
            window.location.href = '/'
          } else {
            window.location.reload()
          }
        }).catch(err => err)
  }
// Clear access token and ID token from local storage on logout button press.
  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    window.location.href ='/'
  }

// check to see if the current time is past the expiration time of the user's token.
  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt;
  }
}

export default Auth
