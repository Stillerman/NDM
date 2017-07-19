<template lang="html">
  <div class="popup z-depth-3">
    <div class="switch">
      <label>
        Edit
        <input v-model="preview" type="checkbox">
        <span class="lever"></span>
        Preview
      </label>
    </div>

    <div v-if="!preview" class="col s6">
      <div class="input-field">
        <input v-model="username" id="username" type="text"></input>
        <label for="username">Username</label>
      </div>
      <div class="input-field">
        <input v-model="topic" id="topic" type="text"></input>
        <label for="topic">Topic</label>
      </div>
      <div class="input-field">
        <textarea v-model='body' id="textarea1" class="materialize-textarea"></textarea>
        <label for="textarea1">Body</label>
      </div>
    </div>

    <div v-if="preview" class="col s6" style="border: 2px;">
      <h3>Preview</h3>
      {{topic}}
      <div v-html="marked(body)"></div>

    </div>


    <a @click="submit()" class="bottom btn-large waves-effect waves-light green"><i class="material-icons">done</i></a>
  </div>

</template>

<script>
import marked from 'marked'
import eventHub from '@/EventHub.js'

export default {
  data () {
    return {
      username: '',
      topic: '',
      body: ``,
      preview: false
    }
  },
  methods: {
    marked,
    submit () {
      eventHub.$emit('new entry', {topic: this.topic, body: this.body, username: this.username})
    }
  }
}
</script>

<style lang="css">
.popup {
  position: fixed;
  bottom: 10%;
  right: 0;
  background-color: #f0f0f0;
  width: 35%;
  height: 80%;
  padding: 5px;
  transition: 1s;
  overflow: scroll;
}


.bottom {
  position: relative;
}
</style>
