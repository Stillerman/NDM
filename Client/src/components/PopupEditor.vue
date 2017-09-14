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
      <p v-if="showError" class="red">{{error}}</p>
      <div class="input-field">
        <select v-model="topic" id="topic" class="browser-default">
          <option value="" disabled selected>Choose your topic</option>
          <option v-for="topic in topics" :value="topic.topic">{{topic.topic}}</option>
        </select>
      </div>
      <div class="input-field">
        <textarea v-model='body' id="textarea1" class="materialize-textarea"></textarea>
        <label for="textarea1">Body</label>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input v-model="run" id="run" type="text"></input>
          <label for="run">Run</label>
        </div>
        <div class="input-field col s6">
          <input v-model="shot" id="shot" type="text"></input>
          <label for="topic">Shot (Optional)</label>
        </div>
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
import axios from 'axios'

export default {
  data () {
    return {
      run: '',
      shot: '',
      error: '',
      showError: false,
      topics: [],
      topic: '',
      body: ``,
      preview: false
    }
  },
  methods: {
    marked,
    submit () {
      console.log(this.shot, this.run)
      if (this.shot.length + this.run.length !== 0) {
        eventHub.$emit('new entry', {topic: this.topic, body: this.body, run: this.run, shot: this.shot})
      } else {
        this.displayError('Shot and Run cannot both be blank.')
      }
    },
    displayError (e) {
      this.error = e
      this.showError = true
    }
  },
  mounted () {
    axios.get('http://localhost:8000/topics/', {
      headers: {
        Authorization: 'Basic dGVzdGluZzpsZXRzdHJ5dGhpcw==',
        testAuth: 'Bearer ' + localStorage.access_token
      }
    })
    .then(response => { this.topics = response.data.results })
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
