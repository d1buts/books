<template>
  <div
    v-if="author"
    class="row"
  >
    <div class="col-12">
      <router-link to="/">Home page</router-link>
    </div>
    <h1 class="col-12">Author info</h1>
    <div class="col-lg-4">
      <div class="card">
        <img class="card-img-top" :src="author.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ author.name }} {{ author.surname }}</h5>
          <p class="card-text">{{ author.description }}</p>
        </div>
      </div>
      <br>
    </div>
    <div class="col-lg-6">
      <ListAndPagination
        :booksList="author.books"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListAndPagination from '@/components/partials/ListAndPagination'

export default {
  name: 'AuthorInfo',
  components: {
    ListAndPagination
  },
  computed: {
    ...mapGetters({
      getAuthorById: 'books/getAuthorById'
    }),
    author () {
      const authorId = this.$route.params.authorId
      return this.getAuthorById(authorId) || null
    }
  }
}
</script>

<style scoped>

</style>
