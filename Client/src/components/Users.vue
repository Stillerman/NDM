<template>
  <div class="users-view">
    <div class="single-user" v-for="user in users">
      Email: {{user.email}}<br>
      First Name: {{user.firstname}}<br>
      Last Name: {{user.lastname}}<br>
      Username: {{user.dbname}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {dbname} from '../dbname.js'

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
      axios.get(`http://localhost:5050/query/${dbname}/sql/select from Person`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
        .then(page => {
          this.users = page.data.result
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
