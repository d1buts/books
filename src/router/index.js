import Vue from 'vue'
import Router from 'vue-router'
import BooksList from '@/components/BooksList'
import BookItem from '@/components/BookItem'
import AuthorInfo from '@/components/AuthorInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BooksList',
      component: BooksList
    },
    {
      path: '/author/:authorId/',
      name: 'AuthorInfo',
      component: AuthorInfo
    },
    {
      path: '/author/:authorId/:bookId',
      name: 'BookItem',
      component: BookItem
    }
  ]
})
