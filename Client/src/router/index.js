import Vue from 'vue'
import Router from 'vue-router'
import Logbook from '@/components/Logbook'
import Callback from '@/components/Callback'
import Web from '@/components/Web'
import User from '@/components/User'
import Users from '@/components/Users'
import TapeEntry from '@/components/TapeEntry'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Logbook',
      component: Logbook
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/web',
      name: 'Web',
      component: Web
    },
    {
      path: '/user/:nickname', component: User
    },
    {
      path: '/users', name: 'Users', component: Users
    },
    {
      path: '/tapeentry', name: 'TapeEntry', component: TapeEntry
    }
  ]
})
