import Vue from 'vue'
import Vuex from 'vuex'
import groupBy from 'lodash/groupby'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTaskIndex: null,
    tasks: [
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
    weekList: state => { return groupBy(state.tasks, 'date') },
    indexOfTask: state => task => { return state.tasks.indexOf(task) },
    tasksCount: state => { return state.tasks.length }
  },
  mutations: {
    setActiveTask (state, index) {
      state.activeTaskIndex = index
    },
    updateActiveTaskBody (state, body) {
      state.tasks[state.activeTaskIndex].body = body
    },
    createTaskNextToActiveTask (state) {
      const nextIndex = state.activeTaskIndex + 1
      state.tasks.splice(nextIndex, 0, {
        body: '...',
        completion: false,
        date: state.tasks[state.activeTaskIndex].date
      })
    },
    removeActiveTask (state) {
      state.tasks.splice(state.activeTaskIndex, 1)
    }
  }
})
