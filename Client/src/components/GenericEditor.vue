<template>
  <div class="tape-entry container">
    <h1>Generic Editor</h1>
    <v-select v-model="selectedType" :options="types"></v-select>
    <input type="text" v-model="title" name="Title" placeholder="Title" value="">
    <div class="input-field col s12">
      <textarea v-model="brief" id="textarea1" class="materialize-textarea"></textarea>
      <label for="textarea1">Brief</label>
    </div>
    <div class="row">
      <div v-for="field in getAdditionalFields()" class="input-field col s6">
        <input type="text" v-model="additionalFields[field]" :name="field" :placeholder="field" value="">
      </div>
    </div>
    <a @click="submit" class="waves-effect waves-light btn">Submit</a>
  </div>
</template>

<script>
import VueEditor from 'vue2-editor'
import vSelect from 'vue-select'

function parseQueryString (query) {
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

function removeEmpty (obj) {
  let newObj = {}
  Object.keys(obj).forEach(key => {
    if (obj[key]) newObj[key] = obj[key] // Only copy prop if its not empty
  })
  return newObj
}

export default {
  components: {
    ve: VueEditor,
    vSelect
  },
  data () {
    return {
      selectedType: 'Tape',
      types: ['Tape', 'Annotation', 'Reel', 'Miniproposal'],
      title: '',
      brief: '',
      additionalFields: {}
    }
  },
  mounted () {
    let query = parseQueryString(window.location.search.substring(1))
    console.log('query', query, document)
    Object.keys(query).forEach(key => {
      if (key === 'title') this.title = query[key]
      else if (key === 'brief') this.brief = query[key]
      else if (key === 'type') this.selectedType = query[key]
      else this.additionalFields[key] = query[key]
    })
  },
  methods: {
    getAdditionalFields () {
      let fields = this.selectedType === 'Tape' ? ['Voltage Tap', 'Voltage Floor', 'Ramp Rate', 'v Goal'] : ['Random Field']
      fields.forEach(f => {
        // initiate blank field if not already
        if (!this.additionalFields.hasOwnProperty(f)) this.$set(this.additionalFields, f, '')
      })
      return fields
    },
    submit () {
      console.log('created', {
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

</style>
