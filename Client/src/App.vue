<template>
  <div id="app">
    <div class="topFixed">
      <button class="btn btn-primary btn-margin login" v-if="!authenticated" @click="login()">Log In</button>
      <button class="btn btn-primary btn-margin login" v-if="authenticated" @click="logout()">Log Out</button>
      <p>{{getHeadingMessage()}}</p>
    </div>
    <img class="resize" src="./assets/logo.png">
    <router-view :auth="auth" :authenticated="authenticated"></router-view>
  </div>
</template>

<script>
import AuthService from './auth/AuthService.js'

const auth = new AuthService()

const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'app',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })

    return {
      username: '',
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout,
    getUser () {
      let nameParts = localStorage.name.split(',')
      return nameParts[1].substring(0, nameParts[1].length - 2)
    },
    getHeadingMessage () {
      if (this.authenticated) {
        return 'Welcome, ' + this.getUser()
      } else {
        return 'Browsing as a guest'
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.topFixed {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #dddddd;
  width:100%;
  text-align: left;
  border-bottom-width: thin;
  border-bottom-color: black;
}

.btn {
  margin: 5px;
}

.topFixed p {
  margin-left: 25px;
}

img.resize {
  width:340px;
  height: auto;
}

.login {
  position: fixed;
  right: 0;
  top: 0;
}
</style>
