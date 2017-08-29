import Vue from 'vue'
import Router from 'vue-router'
import Logbook from '@/components/Logbook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Logbook',
      component: Logbook
    }
  ]
})
