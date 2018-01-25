// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8000/graphql',
    transportBatching: true,
    headers: {
      Authorization: 'Basic dGVzdGluZzpsZXRzdHJ5dGhpcw=='
    }
  }),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  apolloProvider,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
