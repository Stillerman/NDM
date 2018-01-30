<template>
  <div class="generic-viewer">
    <h2>Generic Viewer</h2>
    <div class="row">
      <div class="col s1">
        <i id="settings" @click="showSettings = !showSettings" v-bind:class="{active: showSettings}" class="medium material-icons" style="left:0;">settings</i>
      </div>
      <div v-if="showSettings">
        <div v-for="setting in Object.keys(settings)"class="col s3">
          <input type="text" v-model="settings[setting]" :name="setting" :placeholder="setting" value="">
        </div>
        {{settings}}
        <a class="btn" @click="resetSettings()">Reset</a>
      </div>
      <div v-else class="input-field col s10">
        <i class="material-icons prefix">search</i>
        <input v-model="search" id="icon_prefix" type="text" class="validate">
        <label for="icon_prefix">Search</label>
      </div>
    </div>
    <div v-for="entry in entries" class="row">
      <div class="col s12 m12">
        <div class="card blue-grey darken-1" @contextmenu.prevent="$refs.ctxMenu.open($event, entry)">
          <div class="card-content white-text">
            <span class="card-title">{{entry.summary.title}}</span>

            <!-- Dropdown Trigger -->
            <a class='dropdown-button btn' :data-activates='md5(entry)'>Change View</a>

            <!-- Dropdown Structure -->
            <ul :id='md5(entry)' class='dropdown-content'>
              <li><a href="#!">Sparse</a></li>
              <li><a href="#!">Dense</a></li>
              <li class="divider"></li>
              <li><a href="#!">Custom View 1</a></li>
            </ul>
            <p>{{entry.summary.brief}}</p>
            <ul>
              <li v-for="key in Object.keys(entry.summary.additional)">{{key}}: {{entry.summary.additional[key]}}</li>
            </ul>
          </div>
          <div class="card-action">
            <a v-for="rel in Object.keys(entry.summary.relationships)" @click="goto(entry.summary.relationships[rel])" >Go to {{rel}}</a>
          </div>
        </div>
      </div>
    </div>
    <a id="NewEntry" @click="editing = !editing"class="btn-floating btn-large waves-effect waves-light red"><i v-bind:class="{active: editing}" class="spin material-icons">add</i></a>
    <div class="card editor" v-bind:class="{active: editing}">
      <div class="card-content">
        <span class="card-title">Generic Editor</span>
        <v-select v-model="selectedType" :options="types"></v-select>
        <div class="input-field col s6">
          <input v-model="title" id="title" type="text">
          <label for="title">Title</label>
        </div>
        <div class="input-field col s12">
          <textarea id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Brief</label>
        </div>
        <div v-for="field in getAdditionalFields()" class="input-field col s6">
          <input v-model="additionalFields[field]" :id="field" type="text">
          <label :for="field">{{field}}</label>
        </div>
        <a @click="submit" class="waves-effect waves-light btn">Submit</a>
      </div>
    </div>
    <context-menu id="context-menu" ref="ctxMenu" @ctx-open="onCtxOpen">
      <li class="ctx-item" @click="goto('hi')">Add Annotation</li>
      <li class="ctx-item">Show Annotations</li>
      <li class="ctx-item" @click="edit">Edit</li>
    </context-menu>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import contextMenu from 'vue-context-menu'
let hash = require('blueimp-md5')

let defaultSettings = {
  opOne: 56,
  number: 12,
  name: 'bixby'
}

function removeEmpty (obj) {
  let newObj = {}
  Object.keys(obj).forEach(key => {
    if (obj[key]) newObj[key] = obj[key] // Only copy prop if its not empty
  })
  return newObj
}

export default {
  components: {
    vSelect,
    contextMenu
  },
  data () {
    return {
      entries: require('./FAKEDATA.json'),
      search: '',
      editing: false,
      showSettings: false,
      settings: {},
      // data for editor
      types: ['Tape', 'Reel', 'Annotation', 'Miniproposal'],
      selectedType: 'Tape',
      title: '',
      brief: '',
      additionalFields: {},
      // contextMenu
      ctxMenuTarget: {}
    }
  },
  mounted () {
    this.getSettings()
  },
  watch: {
    settings: {
      handler: 'saveSettings',
      deep: true
    }
  },
  methods: {
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
    getAdditionalFields () {
      let fields = this.selectedType === 'Tape' ? ['width', 'length'] : ['other field', 'could be anything', 'any number of em too']
      fields.forEach(f => {
        // initiate blank field if not already
        if (!this.additionalFields.hasOwnProperty(f)) this.$set(this.additionalFields, f, '')
      })
      return fields
    },
    getUser () {
      let nameParts = localStorage.name.split(',')
      return nameParts[1].substring(0, nameParts[1].length - 2)
    },
    getSettings () {
      if (!localStorage.getItem('settings')) localStorage.setItem('settings', JSON.stringify(defaultSettings))
      this.settings = JSON.parse(localStorage.getItem('settings'))
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
      this.entries.push({
        who: this.getUser(),
        what: this.selectedType,
        when: Date(),
        GUID: Math.random(),
        summary: {
          title: this.title,
          brief: this.brief,
          relationships: {},
          additional: removeEmpty(this.additionalFields)
        }
      })
      this.title = ''
      this.brief = ''
      this.additionalFields = {}
      this.editing = false
    }
  }
}
</script>

<style>
#NewEntry{
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 25px;
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

html {
  overflow-x: hidden;
}

</style>
