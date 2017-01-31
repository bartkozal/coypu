export default {
  state: {
    caretOffset: 0
  },
  getters: {
    caretOffset: state => { return state.caretOffset }
  },
  mutations: {
    setCaretOffset (state, offset) {
      state.caretOffset = offset
    }
  }
}
