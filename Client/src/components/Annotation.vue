<template>
  <blockquote>
    <i>{{annotation.user}}</i> - <p>{{annotation.text}}</p>
    <a class="btn">Reply</a>
    <annotation v-for="ann in annotation.annotations" :key="JSON.stringify(ann)" :annotation="ann"></annotation>
  </blockquote>
</template>

<script>
export default {
  name: 'annotation',
  props: ['annotation'],
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
