<template lang="html">
  <div class="card blue-grey darken-1" style="margin: 10px;">
    <div class="card-content white-text">
      <span class="card-title">{{title}}</span>
      <p v-html='content'></p>
      </div>
    </div>
</template>

<script>
export default {
  props: ['title', 'content']
}
</script>

<style lang="css">
p {
  text-align: left;
}
</style>
