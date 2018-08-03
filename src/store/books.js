import api from '@/utils/api'
import * as types from '@/store/mutation-types'

const state = {
  authorsList: []
}

const getters = {
  getBooksList: state => state.authorsList.reduce((acc, item) => [...acc, ...item.books], []),
  getAuthorById: state => id => state.authorsList.find(item => item.id === id)
}

const actions = {
  async fetchAuthorsList ({ commit }) {
    try {
      const { data: authorsList } = await this.$axios.get(api.books.books())
      commit(types.SAVE_AUTHORS_LIST, authorsList)
    } catch (err) {
      throw err
    }
  }
}

const mutations = {
  [types.SAVE_AUTHORS_LIST] (state, authorsList) {
    state.authorsList = authorsList
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
