import Vue from 'vue'
import Router from 'vue-router'
import Logbook from '@/components/Logbook'
import NewEntry from '@/components/NewEntry'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Logbook',
      component: Logbook
    },
    {
      path: '/logbook',
      name: 'Logbook',
      component: Logbook
    },
    {
      path: '/new',
      name: 'New Entry',
      component: NewEntry
    }
  ]
})
