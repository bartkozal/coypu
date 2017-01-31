import moment from 'moment'
import { extendMoment } from 'moment-range'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import { db } from '../db'

export default {
  state: {
    timelineDate: null,
    timelineTransition: null
  },
  getters: {
    timeline: (state, _, rootState) => {
      return moment(state.timelineDate).locale(rootState.settings.calendarLocale)
    },
    timelineDate: state => { return state.timelineDate },
    timelineTransition: state => { return state.timelineTransition }
  },
  mutations: {
    setDate (state, date) {
      state.timelineDate = date
    },
    setTransition (state, name) {
      state.timelineTransition = name
    }
  },
  actions: {
    setTimeline ({ state, commit, getters, rootState }, date = moment().format()) {
      const isAfter = moment(date).isAfter(state.timelineDate)
      const dayFormat = 'YYYY-MM-DD'

      commit('setTransition', isAfter ? 'next' : 'previous')
      commit('setDate', date)

      const startOfWeek = getters.timeline.startOf('week').format(dayFormat)
      const endOfWeek = getters.timeline.endOf('week').format(dayFormat)
      const week = extendMoment(moment).range(startOfWeek, endOfWeek).by('days')
      const keys = Array.from(week).map(day => day.format(dayFormat))

      db.allDocs({
        include_docs: true,
        keys: keys
      }).then(docs => {
        return docs.rows.reduce((list, row) => {
          list[row.key] = get(row, 'doc.tasks', [])
          return list
        }, {})
      }).then(list => {
        commit('setList', list)
      }).catch(error => {
        throw error
      })
    },
    saveTimeline: debounce((context) => {
      // TODO
      // const id = moment(context.state.timelineDate).format('YYYY-w')

      // db.get(id).catch((err) => {
      //   if (err.name === 'not_found') {
      //     return {
      //       '_id': id,
      //       'tasks': []
      //     }
      //   } else {
      //     throw err
      //   }
      // }).then((doc) => {
      //   if (!isEqual(doc.tasks, context.rootState.list.tasks)) {
      //     doc.tasks = context.rootState.list.tasks
      //     db.put(doc)
      //   }
      // }).catch((err) => {
      //   throw err
      // })
    }, 300)
  }
}
