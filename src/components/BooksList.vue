<template>
  <div v-if="booksList">
    <div class="row">
      <div class="col-lg-6 offset-lg-3">
        <h1>List of books</h1>
        <div>
          <h5>Sort by book name:</h5>
          <b-form-select
            v-model="booksSelectChosen"
            :options="booksSelectOptions"
            class="mb-3"
            @change="updateSortByBookName"
          />
        </div>
        <br>
        <div>
          <h5>Sort by author name:</h5>
          <b-form-select
            v-model="authorSelectChosen"
            :options="authorSelectOptions"
            class="mb-3"
            @change="updateSortByAuthorName"
          />
        </div>
        <br>
        <ListAndPagination
          :booksList="booksList"
        />
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
    booksList () {
      if (this.getBooksList.length) {
        return this.sortBooks(this.sortKey, this.getBooksList)
      }
      return false
    }
  },
  methods: {
    sortByBookNameAZ (booksList) {
      return [...booksList].sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    },
    sortByBookNameZA (booksList) {
      return this.sortByBookNameAZ(booksList).reverse()
    },
    sortByAuthorAZ (booksList) {
      return [...booksList].sort((a, b) => {
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
    sortByAuthorZA (booksList) {
      return this.sortByAuthorAZ(booksList).reverse()
    },
    changeUrlQuery (config) {
      this.$router.replace({ query: config })
    },
    updateSortByBookName ($event) {
      this.authorSelectChosen = null
      this.sortKey = $event
    },
    updateSortByAuthorName ($event) {
      this.booksSelectChosen = null
      this.sortKey = $event
    },
    sortBooks (sortKey, booksList) {
      const sortConfig = sortKey ? { sortBy: sortKey } : {}
      this.changeUrlQuery(sortConfig)
      const selectConfig = this.selectOptions.find(item => item.value === sortKey)
      return selectConfig.action(booksList)
    },
    setSelectOptions (itemsToAdd) {
      return itemsToAdd.reduce((acc, item) => {
        const newItem = this.selectOptions.find(configItem => configItem.value === item)
        return [...acc, newItem]
      }, [])
    },
    setSelect (optionQuery) {
      if (this.booksSelectConfig.includes(optionQuery)) {
        this.booksSelectChosen = optionQuery
      } else if (this.authorSelectConfig.includes(optionQuery)) {
        this.authorSelectChosen = optionQuery
      }
    }
  },
  data () {
    return {
      sortKey: null,
      authorSelectChosen: null,
      booksSelectChosen: null,
      booksSelectOptions: [],
      booksSelectConfig: [null, 'a', 'b'],
      authorSelectConfig: [null, 'c', 'd'],
      authorSelectOptions: [],
      selectOptions: [
        {
          value: null,
          text: 'None chosen',
          action: arg => arg
        },
        {
          value: 'a',
          text: 'Sort A-Z',
          action: this.sortByBookNameAZ
        },
        {
          value: 'b',
          text: 'Sort Z-A',
          action: this.sortByBookNameZA
        },
        {
          value: 'c',
          text: 'Sort A-Z',
          action: this.sortByAuthorAZ
        },
        {
          value: 'd',
          text: 'Sort Z-A',
          action: this.sortByAuthorZA
        }
      ]
    }
  },
  created () {
    this.booksSelectOptions = this.setSelectOptions(this.booksSelectConfig)
    this.authorSelectOptions = this.setSelectOptions(this.authorSelectConfig)
    this.sortKey = this.$route.query.sortBy || null
    this.setSelect(this.sortKey)
  }
}
</script>

<style lang="scss" scoped>

</style>
