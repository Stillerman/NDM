<template lang='html'>
  <div class='logbookrow'>
    <div class="row bold">
      <div class="col s2">
        <i class="small material-icons">label</i>
      </div>
      <div class="col s4">
        {{entry.header.topic}}
      </div>
      <div class="col s3">
        {{entry.header.username}}
      </div>
      <div class="col s3">
        {{entry.header.entered | date}}
      </div>
    </div>
    <div class="row padded">
      <div v-if="!active" v-html="fixNewLines(entry.header.summary)"></div>
      <div v-if="active" v-html="fixNewLines(entry.body.text)"></div>
    </div>

          <p class="expand" @click="active = !active">{{active ? "Contract" : "Expand"}}</p>
    

    <hr>
  </div>

</template>

<script>
import moment from 'moment'

export default {
  filters: {
    fixNewLines: value => value.replace('\n', '<br>'),
    date: value => moment(value).format('LLLL')
  },
  props: ['entry'],
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
      active: false
    }
  }
}

</script>

<style lang='css'>
.padded {
  padding: 10px;
}
.expand {
  text-align: center;
  color: #c0c0c0;
  transition: color 0.5s
}

.expand:hover {
  color: #000000;
}

.bold {
  font-weight: bold;
}
</style>
