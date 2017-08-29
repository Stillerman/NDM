import Vue from 'vue'
import Router from 'vue-router'
import Logbook from '@/components/Logbook'
import Callback from '@/components/Callback'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
