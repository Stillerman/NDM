<template>
  <div class="tape-entry container">
    <h1>Generic Editor</h1>
    <v-select v-model="selectedType" :options="types"></v-select>
    <div class="row">
      <div v-for="field in Object.keys(additionalFields)" class="input-field col s6">
        <input type="text" v-model="additionalFields[field]" :name="field" :placeholder="field" value="">
      </div>
    </div>
    <a @click="submit" class="waves-effect waves-light btn">Submit</a>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from 'axios'
import {dbname} from '../dbname'

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
/*
function removeEmpty (obj) {
  let newObj = {}
  Object.keys(obj).forEach(key => {
    if (obj[key]) newObj[key] = obj[key] // Only copy prop if its not empty
  })
  return newObj
}
*/
export default {
  components: {
    vSelect
  },
  watch: {
    selectedType () {
      this.getAdditionalFields()
    }
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
    axios.get(`http://localhost:5050/query/${dbname}/sql/select from (SELECT expand(classes) from metadata:schema) where abstract == false and not (name like "_%25" or name like "O%25") and name != "V" and name != "E"`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      .then(resp => {
        this.types = resp.data.result.map(thing => thing.name)
      })

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
      axios.get(`http://localhost:5050/query/${dbname}/sql/select expand(properties) from (select expand(classes) from metadata:schema) where name = "${this.selectedType}"`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      .then(resp => {
        console.log('RESPONSE', resp)
        let query = parseQueryString(window.location.search.substring(1))
        let fields = resp.data.result.map(thing => thing.name)
        this.additionalFields = {}
        fields.forEach(f => {
          // initiate blank field if not already
          if (!this.additionalFields.hasOwnProperty(f)) this.$set(this.additionalFields, f, query[f] || '')
        })
      })
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

      this.$router.push('genericviewer')
    }
  }
}
</script>

<style>

</style>
