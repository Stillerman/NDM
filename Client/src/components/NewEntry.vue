<template lang="html">
  <div class="row">
    <div class="col s6">
      <div class="input-field">
        <input v-model="username" id="username" type="text"></input>
        <label for="username">Username</label>
      </div>
      <div class="input-field">
        <input v-model="title" id="title" type="text"></input>
        <label for="title">Title</label>
      </div>
      <div class="input-field">
        <textarea v-model='body' id="textarea1" class="materialize-textarea"></textarea>
        <label for="textarea1">Body</label>
      </div>
    </div>
    <div class="col s6" style="border: 2px;">
      <h3>Preview</h3>
      {{title}}
      <div v-html="marked(body)"></div>

    </div>


    <a id="SubmitEntry" href="/#/" @click.native="submit()" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">done</i></a>

  </div>

</template>

<script>
import marked from 'marked'
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      title: 'Example Title',
      body: `## Mark Down Compatible
***
1. First
2. Second
3. Third`
    }
  },
  methods: {
    marked,
    submit () {
      alert('submitted')
      axios.post('http://localhost:8000/entry/', {
        title: document.getElementById('title').innerHTML,
        body: document.getElementById('body').innerHTML,
        username: document.getElementById('username').innerHTML
      })
      .then(response => console.log(response))
    }
  }
}
</script>

<style lang="css">
#SubmitEntry{
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 25px;
}
</style>
