<template>
  <div id="app">
    <button class="btn btn-primary btn-margin login"
      v-if="!authenticated"
      @click="login()">
        Log In
    </button>


    <p v-if="authenticated">{{getUser()}}</p>
    <button
      class="btn btn-primary btn-margin login"
      v-if="authenticated"
      @click="logout()">
        Log Out
    </button>
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
      return localStorage.name
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
