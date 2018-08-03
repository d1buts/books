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
          :booksList="preparedBooksList"
        />
        <p class="sak">{{ preparedBooksList }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListAndPagination from '@/components/partials/ListAndPagination'

const defaultVelueOfSelect = 'default'
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
      return this.preparedBooksList.length || this.getBooksList.length
    },
    preparedBooksList () {
      return this.sortedBooksList || this.getBooksList
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
    updateSortByBookName () {
      this.sortByAuthorSelected = defaultVelueOfSelect
      this.sortConfigKey = this.sortByAuthorSelected
      this.sortedBooksList = this.sortingConfig[this.sortConfigKey]()
    },
    updateSortByAuthorName () {
      this.sortByBooksNameSelected = defaultVelueOfSelect
      this.sortConfigKey = this.sortByBooksNameSelected
      this.sortedBooksList = this.sortingConfig[this.sortConfigKey]()
    }
  },
  data () {
    return {
      sortConfigKey: defaultVelueOfSelect,
      sortByBooksNameSelected: defaultVelueOfSelect,
      sortByBooksNameOptions: [
        { value: defaultVelueOfSelect, text: 'None chosen' },
        { value: 'a', text: 'Sort A-Z' },
        { value: 'b', text: 'Sort Z-A' }
      ],
      sortByAuthorSelected: defaultVelueOfSelect,
      sortByAuthorOptions: [
        { value: defaultVelueOfSelect, text: 'None chosen' },
        { value: 'c', text: 'Sort A-Z' },
        { value: 'd', text: 'Sort Z-A' }
      ],
      sortingConfig: {
        a: this.sortByBookNameAZ,
        b: this.sortByBookNameZA,
        c: this.sortByAuthorAZ,
        d: this.sortByAuthorZA,
        [defaultVelueOfSelect]: () => this.getBooksList
      },
      sortedBooksList: null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
