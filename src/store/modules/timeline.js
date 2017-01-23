import moment from 'moment'
import PouchDB from 'pouchdb'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import debounce from 'lodash/debounce'

const db = new PouchDB('coypu-offline')

export default {
  state: {
    activeDate: null,
    timelineTransition: null
  },
  getters: {
    activeDate: state => { return state.activeDate },
    activeList: state => {
      return moment(state.activeDate).format('YYYY-w')
    },
    timelineTransition: state => { return state.timelineTransition }
  },
  mutations: {
    setActiveDate (state, date) {
      state.activeDate = date
    },
    setTransition (state, name) {
      state.timelineTransition = name
    }
  },
  actions: {
    setList (context, date) {
      const id = moment(date).format('YYYY-w')

      if (!isNil(context.state.activeDate)) {
        const isAfter = moment(date).isAfter(context.state.activeDate)
        context.commit('setTransition', isAfter ? 'next' : 'previous')
      }

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
    saveActiveList: debounce(function (context) {
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
    }, 400)
  }
}
