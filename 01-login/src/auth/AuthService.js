import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'EventEmitter'
import router from './../router'

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  destination = {}

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  })

  login () {
    console.log('in login')
    console.log('location.pathname = ', location.pathname)
    localStorage.setItem('destination', location.pathname)
    this.destination.place = 'pizza'
    console.log('now authorize')
    this.auth0.authorize()
  }

  handleAuthentication () {
    var that = this
    debugger
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(router)
        console.log(authResult)
        this.setSession(authResult)
        console.log('LS Destination:', localStorage.destination)
        console.log('Destination:', that.destination.place)
        router.replace(localStorage.destination)
      } else if (err) {
        router.replace('home')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('state', authResult.state)
    localStorage.setItem('refreshToken', authResult.refreshToken)
    localStorage.setItem('idTokenPayload', authResult.idTokenPayload)

    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('home')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
