import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    week: {
      '2016-12-26': [],
      '2016-12-27': [
        {
          body: 'go to gym',
          completion: true
        },
        {
          body: 'pay tax for November',
          completion: true
        },
        {
          body: 'take yoga lesson',
          completion: false
        },
        {
          body: 'call mum',
          completion: false
        }
      ],
      '2016-12-28': [
        {
          body: 'lunch with bruh',
          completion: false
        },
        {
          body: 'go to gym',
          completion: true
        },
        {
          body: 'update webpage',
          completion: true
        },
        {
          body: 'buy a birthday gift for LS',
          completion: false
        }
      ],
      '2016-12-29': [],
      '2016-12-30': [],
      '2016-12-31': [],
      '2017-01-01': []
    }
  },
  getters: {
    currentWeek: state => { return state.week }
  }
})
