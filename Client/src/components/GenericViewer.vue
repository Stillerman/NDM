<template>
  <div class="generic-viewer">
    <h2>{{settings.pageTitle}}</h2>
    <div class="row">
      <div class="col s1">
        <i id="settings" @click="showSettings = !showSettings" v-bind:class="{active: showSettings}" class="medium material-icons" style="left:0;">settings</i>
      </div>
      <div class="input-field col s10">
        <i class="material-icons prefix">search</i>
        <input v-model="settings.search" id="icon_prefix" type="text" class="validate">
        <label for="icon_prefix">Search</label>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m12">
        <transition name="fade">
          <div class="card" v-if="showSettings">
            <div class="card-content">
              <span class="card-title">Settings</span>
              <div class="row">
                <div v-for="setting in Object.keys(persistantSettings)" class="col s2">
                  <input type="text" v-model="persistantSettings[setting]" :name="setting" :placeholder="setting" value="">
                </div>
              </div>
            </div>
            <div class="card-action">
              <a @click="resetSettings()">Reset</a>
              <a @click="generateURL()">URL</a>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div v-for="entry in entries" class="row">
      <div class="col s12 m12">
        <div class="card blue-grey darken-1" @contextmenu.prevent="$refs.ctxMenu.open($event, entry)">
          <span class="new badge" style="left: 10px;" data-badge-caption="">{{entry['@class']}}</span>
          <div class="card-content white-text">
            <span class="card-title">{{retrieve('title', entry)}}</span>

            <!-- Dropdown Trigger -->
            <a class='dropdown-button btn' :data-activates='md5(entry)'>Change View</a>

            <!-- Dropdown Structure -->
            <ul :id='md5(entry)' class='dropdown-content'>
              <li><a href="#!">Sparse</a></li>
              <li><a href="#!">Dense</a></li>
              <li class="divider"></li>
              <li><a href="#!">Custom View 1</a></li>
            </ul>
            <p>{{retrieve('body', entry)}}</p>
            <ul>
              <li v-for="key in Object.keys(entry)">{{key}}: {{entry[key]}}</li>
            </ul>
            <annotation v-if="annotationsShowing === entry" v-for="annotation in entry.annotations" :key="JSON.stringify(annotation)" :annotation="annotation"></annotation>
          </div>
          <div class="card-action">
            <!--a v-for="rel in Object.keys(entry.summary.relationships)" @click="goto(entry.summary.relationships[rel])" >Go to {{rel}}</a-->
          </div>
        </div>
      </div>
    </div>
    <a id="NewEntry" @click="editing = !editing"class="btn-floating btn-large waves-effect waves-light red"><i v-bind:class="{active: editing}" class="spin material-icons">add</i></a>
    <div class="card editor" v-bind:class="{active: editing}">
      <div class="card-content">
        <span class="card-title">Generic Editor</span>
        <a class="btn-flat wave-effects" @click="openExternalEditor()">Open in separate window</a>
        <v-select v-model="selectedType" :options="types"></v-select>
        <div v-for="field in Object.keys(additionalFields)" class="input-field col s6">
          <input v-model="additionalFields[field]" :id="field" type="text">
          <label :for="field">{{field}}</label>
        </div>
        <a @click="submit" class="waves-effect waves-light btn">Submit</a>
      </div>
    </div>
    <context-menu id="context-menu" ref="ctxMenu" @ctx-open="onCtxOpen">
      <li class="ctx-item" @click="annotate">Add Annotation</li>
      <li v-if="annotationsShowing == ctxMenuTarget" class="ctx-item" @click="hideAnnotations">Hide Annotations</li>
      <li v-else class="ctx-item" @click="showAnnotations">Show Annotations</li>
      <li class="ctx-item" @click="edit">Edit</li>
    </context-menu>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import contextMenu from 'vue-context-menu'
import Annotation from './Annotation.vue'
import axios from 'axios'
import {dbname} from '../dbname.js'

let hash = require('blueimp-md5')

let defaultSettings = {
  pageTitle: 'Generic Viewer',
  number: 4,
  name: 'bixby',
  anotherNumber: 6,
  search: ''
}
/*
function removeEmpty (obj) {
  let newObj = {}
  Object.keys(obj).forEach(key => {
    if (obj[key]) newObj[key] = obj[key] // Only copy prop if its not empty
  })
  return newObj
}
*/
function copyToClipboard (text) {
  window.prompt('Copy to clipboard: Ctrl+C, Enter', text)
}

export default {
  components: {
    vSelect,
    contextMenu,
    Annotation
  },
  data () {
    return {
      entries: require('./FAKEDATA.json'),
      annotationsShowing: null,
      search: '',
      editing: false,
      showSettings: false,
      persistantSettings: {},
      urlSettings: {},
      // data for editor
      types: ['Tape', 'Reel', 'Annotation', 'Miniproposal'],
      selectedType: 'Tape',
      title: '',
      brief: '',
      additionalFields: {},
      // contextMenu
      ctxMenuTarget: {},
      schemaMeta: {}
    }
  },
  computed: {
    settings () {
      let tmp = JSON.parse(JSON.stringify(this.persistantSettings)) // clone persistant
      Object.keys(this.urlSettings).forEach(key => {
        tmp[key] = this.urlSettings[key]
      })
      return tmp
    }
  },
  mounted () {
    this.getSettings()
    this.urlSettings = getURLArgs()
    this.refresh()
  },
  watch: {
    persistantSettings: {
      handler: 'saveSettings',
      deep: true
    },
    selectedType () {
      this.getAdditionalFields()
    }
  },
  methods: {
    refresh () {
      console.log('refreshing')
      axios.get(`http://localhost:5050/query/${dbname}/sql/select from _schemaMetadata`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
        .then(resp => {
          resp.data.result.forEach(meta => {
            this.schemaMeta[meta.name] = JSON.parse(meta.template)
          })
        })
      axios.get(`http://localhost:5050/query/${dbname}/sql/select from V where @class != "_schemaMetadata"`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.access_token
          }
        })
        .then(resp => {
          console.log(resp.data.result)
          this.entries = resp.data.result
        })

      axios.get(`http://localhost:5050/query/${dbname}/sql/select from (SELECT expand(classes) from metadata:schema) where abstract == false and not (name like "_%25" or name like "O%25") and name != "V" and name != "E"`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.access_token
          }
        })
        .then(resp => {
          this.types = resp.data.result.map(thing => thing.name)
        })
    },
    retrieve (field, entry) {
      if (!this.schemaMeta[entry['@class']]) console.log('No metadata for', entry['@class'])
      else {
        return this.schemaMeta[entry['@class']][field].map(key => {
          return entry[key]
        }).join(' ')
      }
    },
    goto (guid) {
      alert('Going to ' + guid)
    },
    onCtxOpen (locals) {
      console.log(locals)
      this.ctxMenuTarget = locals // Store the target away for later
    },
    edit () {
      this.editing = true
      this.selectedType = this.ctxMenuTarget.what
      this.title = this.ctxMenuTarget.summary.title
      this.brief = this.ctxMenuTarget.summary.brief
      this.additionalFields = this.ctxMenuTarget.summary.additional
    },
    showAnnotations () {
      this.annotationsShowing = this.ctxMenuTarget
    },
    hideAnnotations () {
      this.annotationsShowing = null
    },
    annotate () {
      this.editing = true
      this.selectedType = 'Annotation'
    },
    getAdditionalFields () {
      axios.get(`http://localhost:5050/query/${dbname}/sql/select expand(properties) from (select expand(classes) from metadata:schema) where name = "${this.selectedType}"`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      .then(resp => {
        console.log('RESPONSE', resp)
        let fields = resp.data.result.map(thing => thing.name)
        this.additionalFields = {}
        fields.forEach(f => {
          // initiate blank field if not already
          if (!this.additionalFields.hasOwnProperty(f)) this.$set(this.additionalFields, f, '')
        })
      })
    },
    getUser () {
      let nameParts = localStorage.name.split(',')
      return nameParts[1].substring(0, nameParts[1].length - 2)
    },
    getSettings () {
      if (!localStorage.getItem('settings')) localStorage.setItem('settings', JSON.stringify(defaultSettings))
      this.persistantSettings = JSON.parse(localStorage.getItem('settings'))
    },
    generateURL () {
      let url = location.origin + location.pathname + '?'
      Object.keys(this.settings).forEach(key => {
        url += key + '=' + this.settings[key] + '&'
      })
      url = url.substr(0, url.length - 1) // Remove excess '&'
      copyToClipboard(url)
    },
    openExternalEditor () {
      let getArgs = 'type=' + this.selectedType
      Object.keys(this.additionalFields).forEach(key => {
        if (this.additionalFields[key]) getArgs += '&' + key + '=' + this.additionalFields[key]
      })
      this.$router.push('/genericeditor?' + getArgs)
    },
    saveSettings (set) {
      console.log('saving settings', set)
      localStorage.setItem('settings', JSON.stringify(set))
    },
    resetSettings () {
      localStorage.removeItem('settings')
      this.getSettings()
    },
    md5 (obj) {
      return hash(JSON.stringify(obj))
    },
    submit () {
      axios.post(`http://localhost:5050/command/${dbname}/sql`, `insert into ${this.selectedType} (${Object.keys(this.additionalFields).join(', ')}) values (${Object.keys(this.additionalFields).map(key => {
        if (typeof this.additionalFields[key] === 'string') return '"' + this.additionalFields[key] + '"'
        return this.additionalFields[key]
      })})`, {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })

      this.title = ''
      this.brief = ''
      this.additionalFields = {}
      this.editing = false
    }
  }
}

function getURLArgs () {
  let query = window.location.search.substring(1)
  var vars = query.split('&')
  var queryString = {}
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    // If first entry with this name
    if (typeof queryString[pair[0]] === 'undefined') {
      queryString[pair[0]] = decodeURIComponent(pair[1])
      // If second entry with this name
    } else if (typeof queryString[pair[0]] === 'string') {
      var arr = [queryString[pair[0]], decodeURIComponent(pair[1])]
      queryString[pair[0]] = arr
      // If third or later entry with this name
    } else {
      queryString[pair[0]].push(decodeURIComponent(pair[1]))
    }
  }
  return queryString
}
</script>

<style>
#NewEntry{
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 25px;
}

blockquote {
  text-align: left;
}

.editor {
  transition: 0.5s;
  position: absolute;
  right: -360px;
  top: 50px;
  min-width: 300px;
  margin: 10px;
}

.editor.active {
  right: 0;
}

.dropdown-button {
  right: 0px;
  top: 0px;
  margin: 10px;
  position: absolute;
}

.badge {
  left: 0px;
  top: 0px;
  margin: 20px;
  position: absolute;
}

.spin {
  transition: 0.5s
}
.spin.active{
  transform: rotateZ(135deg) scale(1.1);
}

#settings{
  transition: 0.3s

}

#settings.active {
  transform: rotateZ(90deg);
  color: #f0f0f0;

}

.fade-enter-active, .fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  max-height: 1px;
}

html {
  overflow-x: hidden;
}

</style>
