<template lang="html">
  <div id="web">
    <div class="row">
        <div v-for="entry in getVisibleEntries()" class="col s12 m4">
          <div class="card darken-1" :class="{'blue-grey': !entry.exploring, 'blue': entry.exploring}">
            <div class="card-content white-text">
              <span class="card-title">{{entry.user}}</span>
              <p>{{entry.content}}</p>
            </div>
            <div class="card-action">

              <button @click="explore(entry)" class="btn btn-primary red waves">Explore</button>

            </div>

          </div>
        </div>
      </div>
      <div v-if="exploring" class="row">
        <blockquote>
          <web></web>
        </blockquote>
      </div>
  </div>
</template>

<script>
export default {
  name: 'web',
  data () {
    return {
      exploring: false,
      index: 0,
      entries: [
        {user: 'jts', content: 'hello', exploring: false},
        {user: 'jbs', content: 'helllo', exploring: false},
        {user: 'jxs', content: 'hello', exploring: false},
        {user: 'rts', content: 'hello', exploring: false},
        {user: 'sss', content: 'hello', exploring: false}
      ]
    }
  },
  methods: {
    getVisibleEntries () {
      return this.entries.slice(0, 3)
    },
    explore (entry) {
      this.unexploreAll()
      if (entry.exploring) {
        entry.exploring = false
        return
      }
      entry.exploring = true
      this.exploring = true
    },
    unexploreAll () {
      this.entries.forEach((entry) => {
        entry.exploring = false
      })
    }
  }
}
</script>

<style lang="css">
  .selected {
    background-color: blue;
  }

  .explore-row {
    background-color: brown;
  }

</style>
