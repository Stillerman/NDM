import Vue from 'vue'
import Router from 'vue-router'
import Logbook from '@/components/Logbook'
import Callback from '@/components/Callback'
import Web from '@/components/Web'

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
    }
  ]
})
