export default {
  state: {
    activeDate: null
  },
  getters: {
    activeDate: state => { return state.activeDate }
  },
  mutations: {
    setActiveDate (state, date) {
      state.activeDate = date
    }
  }
}
