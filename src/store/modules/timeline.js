import moment from 'moment'
import PouchDB from 'pouchdb'

const db = new PouchDB(process.env.POUCH_PATH)

export default {
  state: {
    activeDate: null,
    activeWeek: null
  },
  getters: {
    activeDate: state => { return state.activeDate }
  },
  mutations: {
    setActiveDate (state, date) {
      state.activeDate = date
      state.activeWeek = moment(date).format('YYYY-w')
    }
  },
  actions: {
    getTasks (context, date) {
      context.commit('setActiveDate', date)
      db.get(context.state.activeWeek).then((week) => {
        context.state.tasks = week.tasks
      }).catch((e) => {
        context.state.tasks = []
      })
    }
  }
}
