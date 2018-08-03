<template>
  <div v-if="totalBooks">
    <div class="row">
      <div class="col-lg-6 offset-lg-3">
        <h1>List of books</h1>
        <div>
          <h5>Sort by book name:</h5>
          <b-form-select
            v-model="sortByBooksNameSelected"
            :options="sortByBooksNameOptions"
            class="mb-3"
            @change="updateSortByBookName"
          />
        </div>
        <br>
        <div>
          <h5>Sort by author name:</h5>
          <b-form-select
            v-model="sortByAuthorSelected"
            :options="sortByAuthorOptions"
            class="mb-3"
            @change="updateSortByAuthorName"
          />
        </div>
        <br>
        <ListAndPagination
          :booksList="sortedBooksList"
        />
        <p class="sak">{{ sortedBooksList }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListAndPagination from '@/components/partials/ListAndPagination'

export default {
  name: 'BooksList',
  components: {
    ListAndPagination
  },
  computed: {
    ...mapGetters({
      getBooksList: 'books/getBooksList',
      getAuthorById: 'books/getAuthorById'
    }),
    totalBooks () {
      return this.getBooksList.length
    }
  },
  methods: {
    sortByBookNameAZ () {
      return this.getBooksList.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    },
    sortByBookNameZA () {
      return this.sortByBookNameAZ().reverse()
    },
    sortByAuthorAZ () {
      return this.getBooksList.sort((a, b) => {
        const authorA = this.getAuthorById(a.authorId)
        const authorB = this.getAuthorById(b.authorId)
        const AuthorAFullName = `${authorA.name} ${authorA.surname}`
        const AuthorBFullName = `${authorB.name} ${authorB.surname}`
        if (AuthorAFullName < AuthorBFullName) {
          return -1
        }
        if (AuthorAFullName > AuthorBFullName) {
          return 1
        }
        return 0
      })
    },
    sortByAuthorZA () {
      return this.sortByAuthorAZ().reverse()
    },
    updateSortByBookName ($event) {
      this.sortByAuthorSelected = null
      this.sortedBooksList = this.sortBooks($event)
      console.log($event, this.sortByBooksNameSelected, ' this.updateSortByBookName')
    },
    updateSortByAuthorName ($event) {
      this.sortByBooksNameSelected = null
      this.sortedBooksList = this.sortBooks($event)
      console.log($event, this.sortByAuthorSelected, ' this.updateSortByAuthorName')
    },
    sortBooks (configKey) {
      if (!configKey) {
        return this.getBooksList
      }
      return this.sortingConfig[configKey]()
    }
  },
  data () {
    return {
      sortByBooksNameSelected: null,
      sortByBooksNameOptions: [
        { value: null, text: 'None chosen' },
        { value: 'a', text: 'Sort A-Z' },
        { value: 'b', text: 'Sort Z-A' }
      ],
      sortByAuthorSelected: null,
      sortByAuthorOptions: [
        { value: null, text: 'None chosen' },
        { value: 'c', text: 'Sort A-Z' },
        { value: 'd', text: 'Sort Z-A' }
      ],
      sortingConfig: {
        a: this.sortByBookNameAZ,
        b: this.sortByBookNameZA,
        c: this.sortByAuthorAZ,
        d: this.sortByAuthorZA
      },
      sortedBooksList: []
    }
  },
  created () {
    const unwatch = this.$watch('getBooksList', function () {
      if (this.getBooksList.length) {
        this.sortedBooksList = this.getBooksList
        unwatch()
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
