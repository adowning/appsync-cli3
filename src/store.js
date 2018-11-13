import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    userId: null,
    employeeList: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  
  setEmployeeList(state, list) {
    console.log(list)
    state.employeeList = list
  },
  setUserId(state, userId) {
    state.userId = userId
  },
}
})

export default store
