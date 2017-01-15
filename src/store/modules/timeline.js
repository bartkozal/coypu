import moment from 'moment'
import PouchDB from 'pouchdb'
import isEqual from 'lodash/isEqual'

const db = new PouchDB(process.env.POUCH_PATH)

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
  },
  actions: {
    getList (context, date) {
      const id = moment(date).format('YYYY-w')
      context.commit('setActiveDate', date)

      db.get(id).then((doc) => {
        context.rootState.list.tasks = doc.tasks
      }).catch((err) => {
        if (err.name === 'not_found') {
          return
        } else {
          throw err
        }
      })
    },
    saveActiveList (context) {
      const id = moment(context.state.activeDate).format('YYYY-w')

      db.get(id).catch((err) => {
        if (err.name === 'not_found') {
          return {
            '_id': id,
            'tasks': []
          }
        } else {
          throw err
        }
      }).then((doc) => {
        if (!isEqual(doc.tasks, context.rootState.list.tasks)) {
          doc.tasks = context.rootState.list.tasks
          db.put(doc)
        }
      }).catch((err) => {
        throw err
      })
    }
  }
}
