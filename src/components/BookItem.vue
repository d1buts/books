<template>
  <div
    v-if="book"
    class="row"
  >
    <div class="col-12">
      <router-link to="/">Home page</router-link>
      <router-link :to="`/author/${book.authorId}`">Author page</router-link>
    </div>
    <h1>Book info</h1>
    <b-card>
      <b-media>
        <img class="image" :src="book.image" />
        <h5 class="mt-0">{{ book.name }} ({{ book.year }})</h5>
        <p>
          Author: <router-link :to="`/author/${book.authorId}`">{{ `${author.name} ${author.surname}` }}</router-link>
        </p>
        <p>
          {{ book.description }}
        </p>
        <p>
          Price: ${{ book.price }}
        </p>
      </b-media>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BookItem',
  computed: {
    ...mapGetters({
      getAuthorById: 'books/getAuthorById'
    }),
    author () {
      const authorId = this.$route.params.authorId
      return this.getAuthorById(authorId) || null
    },
    book () {
      const bookId = this.$route.params.bookId
      return this.author && this.author.books.find(item => item.id === bookId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .image {
    height: 140px;
    width: auto;
  }
</style>
