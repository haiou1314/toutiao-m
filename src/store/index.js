import Vue from 'vue'
import Vuex from 'vuex'
// import { getItem, setItem } from '@/utils/storage.js'
// import storages from '@/utils/storage.js'
import { getToken, setToken } from '@/utils'

Vue.use(Vuex)
// const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getToken()
  },

  getters: {
  },

  mutations: {
    setUser (state, user) {
      state.user = user
      // storages.set(TOKEN_KEY, state.user)
      setToken(state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
