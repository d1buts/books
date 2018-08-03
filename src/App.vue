<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions({
      fetchAuthorsList: 'books/fetchAuthorsList'
    })
  },
  created () {
    this.fetchAuthorsList()
  }
}
</script>

<style lang="scss" scoped>
</style>
