<template lang='html'>
  <div class='logbook'>
    <h1>Welcome to the Logbook.</h1>
    <!--card v-for='thing in entries' :title='thing'></card-->
    <ul class='collapsible' data-collapsible='accordion'>
      <li v-for='entry in entries'>
        <div class='collapsible-header' style="text-align: left;">

          <div class="row" style="font-weight: bold;">
            <div class="col s1"><i class='material-icons'>filter_drama</i></div>
            <div class="col s3"><p>{{entry.header.topic}}</p></div>
            <div class="col s4"><p>{{entry.header.username}}</p></div>
            <div class="col s4"><p>{{entry.header.entered | date}}</p></div>
          </div>
          <p v-html="fixNewLines(entry.header.summary)"></p>
        </div>
        <div class='collapsible-body'>
          <carousel autoPlay='true'>
            <slide>
              <card title='Entry' :content='fixNewLines(entry.body.text)'>
              </card>
            </slide>
            <slide>
              <card title='Author' :content='entry.header.username'></card>
            </slide>
            <slide>
              <card title='Meta' :content='getMeta(entry)'></card>
            </slide>
          </carousel>
          <a class='waves-effect waves-light btn'>View Comments ({{0}})</a>
        </div>
      </li>
    </ul>


    <a id="NewEntry" href="/#/new" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>

  </div>

</template>

<script>
import Card from '@/components/Card.vue'
import { Carousel, Slide } from 'vue-carousel'
import gql from 'graphql-tag'
import axios from 'axios'
import moment from 'moment'

export default {
  apollo: {
    entries: gql`{
      entries(run: 1090909){
        header{
          username
          topic
          entered
          summary
        }
        id
        body{
          text
        }
      }
    }`
  },
  filters: {
    fixNewLines: value => value.replace('\n', '<br>'),
    date: value => moment(value).format('LLLL')
  },
  components: {
    Card,
    Carousel,
    Slide
  },
  mounted () {
    axios.get('')
  },
  methods: {
    getMeta (entry) {
      return `Created by ${entry.header.username} at ${moment(entry.header.entered).format('llll')}.`
    },
    fixNewLines: (text) => text.replace('\n', '<br>')
  },
  data () {
    return {
      entries: [],
      active: true
    }
  }
}

</script>

<style lang='css'>
#NewEntry{
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 25px;
}
</style>
