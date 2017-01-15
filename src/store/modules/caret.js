export default {
  state: {
    offset: 0
  },
  getters: {
    caretOffset: state => { return state.offset }
  },
  mutations: {
    setOffset (state, newOffset) {
      state.offset = newOffset
    }
  },
  actions: {
    setCaretOffset ({ commit }, offset) {
      commit('setOffset', offset)
    }
  }
}
