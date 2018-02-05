import Vue from 'vue'
import Router from 'vue-router'
import Logbook from '../components/Logbook.vue'
import Callback from '../components/Callback.vue'
import Web from '../components/Web.vue'
import User from '../components/User.vue'
import Users from '../components/Users.vue'
import TapeEntry from '../components/TapeEntry.vue'
import GenericViewer from '../components/GenericViewer.vue'
import GenericEditor from '../components/GenericEditor.vue'

Vue.use(Router)

console.log('LOGBOOK', Logbook)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'Home', component: GenericViewer
    },
    {
      path: '/logbook',
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
    },
    {
      path: '/genericviewer', name: 'GenericViewer', component: GenericViewer
    },
    {
      path: '/genericeditor', name: 'GenericEditor', component: GenericEditor
    }
  ]
})
