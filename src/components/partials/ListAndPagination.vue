<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="(book, index) in visibleBooks"
        :key="`${index}-${book.id}`"
      >
        <router-link :to="`/author/${book.authorId}/${book.id}`">{{ book.name }}</router-link>
      </b-list-group-item>
    </b-list-group>
    <br>
    <b-pagination
      size="sm"
      :total-rows="totalBooks"
      v-model="currentPage"
      :per-page="booksPerPage"
    />
  </div>
</template>

<script>
export default {
  name: 'ListAndPagination',
  props: {
    booksList: {
      type: Array,
      default: () => []
    },
    booksPerPage: {
      type: Number,
      default: 5
    }
  },
  computed: {
    visibleBooks () {
      const indexOfLastBook = this.booksPerPage * this.currentPage
      const indexOfFirstBook = indexOfLastBook - this.booksPerPage
      return this.booksList.slice(indexOfFirstBook, indexOfLastBook)
    },
    totalBooks () {
      return this.booksList.length
    }
  },
  data () {
    return {
      currentPage: 1
    }
  }
}
</script>

<style scoped>

</style>
