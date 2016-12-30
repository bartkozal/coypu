import Vue from 'vue'
import Vuex from 'vuex'
import groupBy from 'lodash/groupby'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTaskIndex: null,
    currentWeek: [
      {
        body: 'go to gym',
        completion: true,
        date: '2016-12-27'
      },
      {
        body: 'pay tax for November',
        completion: true,
        date: '2016-12-27'
      },
      {
        body: 'take yoga lesson',
        completion: false,
        date: '2016-12-27'
      },
      {
        body: 'call mum',
        completion: false,
        date: '2016-12-27'
      },
      {
        body: 'lunch with bruh',
        completion: false,
        date: '2016-12-28'
      },
      {
        body: 'go to gym',
        completion: true,
        date: '2016-12-28'
      },
      {
        body: 'update webpage',
        completion: true,
        date: '2016-12-28'
      },
      {
        body: 'buy a birthday gift for LS',
        completion: false,
        date: '2016-12-28'
      }
    ]
  },
  getters: {
    currentWeek: state => { return groupBy(state.currentWeek, 'date') }
  },
  mutations: {
    setActiveTask (state, task) {
      state.activeTaskIndex = state.currentWeek.indexOf(task)
    },
    updateActiveTaskBody (state, body) {
      state.currentWeek[state.activeTaskIndex].body = body
    },
    createTaskNextToActiveTask (state) {
      const nextIndex = state.activeTaskIndex + 1
      state.currentWeek.splice(nextIndex, 0, {
        body: '...',
        completion: false,
        date: state.currentWeek[state.activeTaskIndex].date
      })
    },
    removeActiveTask (state) {
      state.currentWeek.splice(state.activeTaskIndex, 1)
    }
  }
})
