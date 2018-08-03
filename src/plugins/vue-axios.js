import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store'
import { baseURL } from '@/utils/api'

const instance = Axios.create({
  baseURL
})

// Add axios instance to the store and Vue prototype
store.axios = store.$axios = instance
Vue.use(VueAxios, instance)

export default instance
