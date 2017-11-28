<template>
  <div class="users-view">
    <div class="single-user" v-for="user in users">
      Email: {{user.email}}<br>
      First Name: {{user.firstname}}<br>
      Last Name: {{user.lastname}}<br>
      Username: {{user.username}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      axios.get('http://localhost:8000/users', {
        headers: {
          Authorization: 'Basic dGVzdGluZzpsZXRzdHJ5dGhpcw==',
          testAuth: 'Bearer ' + localStorage.access_token
        }
      })
        .then(page => {
          this.users = page.data.results
        })
    }
  }
}
</script>

<style>
.single-user {
  margin: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
}

</style>
