<template lang='html'>
  <div class='logbook'>
    <h1>Welcome to the Logbook</h1>
    <div class="row">
      <div class="col s1">
        <i id="settings" @click="showSettings = !showSettings" v-bind:class="{active: showSettings}" class="medium material-icons" style="left:0;">settings</i>
      </div>
      <div v-if="showSettings">
        <div class="col s3">
          <input type="text" v-model="run" name="Run" placeholder="Run" value="">
        </div>
        <div class="col s3">
          <input type="text" v-model="shot" name="Shot" placeholder="Shot" value="">
        </div>
        <div class="col s3">
          {{searchData}}
        </div>
    </div>
    <div v-else class="input-field col s10">
          <i class="material-icons prefix">search</i>
          <input v-model="search" id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">Search</label>
    </div>
          </div>


    <div v-for='entry in entries' style="text-align: left;">
      <log-book-row :entry="entry"></log-book-row>
    </div>

    <popup-editor v-if="editing"></popup-editor>
    <a id="NewEntry" @click="editing = !editing" class="btn-floating btn-large waves-effect waves-light red"><i v-bind:class="{active: editing}" class="spin material-icons">add</i></a>
  </div>

</template>

<script>
import Card from '@/components/Card.vue'
import LogBookRow from '@/components/LogBookRow.vue'
import PopupEditor from '@/components/PopupEditor.vue'
import eventHub from '@/EventHub.js'
import axios from 'axios'

import { Carousel, Slide } from 'vue-carousel'

import gql from 'graphql-tag'
import moment from 'moment'

export default {
  apollo: {
    entries: {
      query: gql`
        query getEntries($run: Int!){
        entries(run: $run){
          header{
            username
            topic
            entered
            summary
          }
          id
          body{
            text
          }
        }
      }`,
      variables () {
        return {
          run: this.run
        }
      }
    },
    pollInterval: 5000 // Milliseconds
  },
  filters: {
    fixNewLines: value => value.replace('\n', '<br>'),
    date: value => moment(value).format('LLLL')
  },
  components: {
    Card,
    Carousel,
    Slide,
    LogBookRow,
    PopupEditor
  },
  watch: {
    '$route' (to, from) {
      // react to route changes...
    }
  },
  created () {
    eventHub.$on('new entry', ({topic, body, run, shot}) => {
      this.editing = false
      let temp = {
        header: {
          username: localStorage.nickname,
          topic,
          entered: moment(),
          summary: body.substring(0, 135)
        },
        body: {
          text: body
        }
      }
      axios.post('http://localhost:8000/entry/', {
        topic,
        text: body,
        username: localStorage.nickname,
        run
      }, {
        headers: {
          Authorization: 'Basic dGVzdGluZzpsZXRzdHJ5dGhpcw==',
          testAuth: 'Bearer ' + localStorage.access_token
        }
      })
      .then(response => console.log(response))
      .then(() => this.entries.push(temp))
    })

    eventHub.$on('new constraint', (field, val) => {
      this.search += ':' + field + '=' + val + ' '
    })
  },
  computed: {
    searchData () {
      let results = {}
      this.search.split(' ').filter(word => word.startsWith(':'))
        .map(term => {
          return {
            field: term.split('=')[0].substring(1),
            val: term.split('=')[1]
          }
        })
        .forEach(constr => {
          results[constr.field] = constr.val
        })
      return results
    }
  },
  methods: {
    getMeta (entry) {
      return `Created by ${entry.header.username} at ${moment(entry.header.entered).format('llll')}.`
    },
    fixNewLines: (text) => text.replace('\n', '<br>'),
    alrt: line => alert(line),
    isActive: entry => entry.active || false,
    activate: entry => { entry.active = true },
    toggle: entry => { entry.active = !(entry.active || false) }
  },
  data () {
    return {
      entries: [],
      editing: false,
      run: 1090909,
      shot: 0,
      showSettings: false,
      search: ''
    }
  }
}

</script>

<style lang='css'>
#NewEntry{
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 25px;

}

.spin {
  transition: 0.5s
}
.spin.active{
transform: rotateZ(45deg) scale(1.5);
}

#settings{
  transition: 0.3s

}

#settings.active {
  transform: rotateZ(90deg);
  color: #f0f0f0;

}

</style>
