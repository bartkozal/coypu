import Vue from 'vue'
import Vuex from 'vuex'
import groupBy from 'lodash/groupBy'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    allTasks: state => { return groupBy(state.tasks, 'date') }
  }
})
