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
        <div style='background-color:grey;' v-if='connectionsVisible'>
          These are the connections
        </div>
        <ul id='dropdown1' class='dropdown-content'>
          <li><a href="#!">one</a></li>
          <li><a href="#!">two</a></li>
          <li class="divider"></li>
          <li><a href="#!">three</a></li>
          <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
          <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
        </ul>
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
    needsExpansion: entry => entry.body.text.length !== entry.header.summary.length
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

span.connections {
  color: #f44336;
  transition: 0.5s;
}

span.connections:hover {
  color: black;
}
</style>
