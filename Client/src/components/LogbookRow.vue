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
        <span class="connections"></span>
        <a class='btn' @click="connectionsVisible = !connectionsVisible">{{entry.header.username}}</a>
        <div class="connectionsBlob" :style="{transform: 'translate(0, ' + getPageOffset() +', 0)'}" v-if='connectionsVisible'>
          <a :href="('/user/' + entry.header.username + '/entries')">Other Entries</a>
          <br>
          <a :href="('/user/' + entry.header.username + '/miniproposals')">Other Miniproposals</a>
        </div>

      </div>
      <div class="col s3">
        {{entry.header.entered | date}}
      </div>
    </div>
    <div class="row padded">
      <div v-if="!active" v-html="fixNewLines(entry.header.summary)"></div>
      <div v-if="active" v-html="fixNewLines(entry.body.text)"></div>
    </div>

    <p v-if="needsExpansion(entry)" class="expand" @click="active = !active">{{active ? "Contract" : "Expand"}}</p>
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
    toggle: entry => { entry.active = !(entry.active || false) },
    needsExpansion: entry => entry.body.text.length !== entry.header.summary.length,
    getPageOffset: () => window.pageYOffset
  },
  data () {
    return {
      connectionsVisible: false,
      active: false,
      id: Math.random()
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

.connectionsBlob {
  position: absolute;
  background-color: #dddddd;
  padding: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-left: 5px;
}

span.connections {
  color: #f44336;
  transition: 0.5s;
}

span.connections:hover {
  color: black;
}
</style>
