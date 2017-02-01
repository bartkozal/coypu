import moment from 'moment'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import { db } from '../db'
import { weekDays } from '../helpers'

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
    setTimeline ({ state, commit, getters }, date = moment().format()) {
      const isAfter = moment(date).isAfter(state.timelineDate)

      commit('setTransition', isAfter ? 'next' : 'previous')
      commit('setDate', date)

      db.allDocs({
        include_docs: true,
        keys: weekDays(getters.timeline)
      }).then(result => {
        return result.rows.reduce((list, row) => {
          list[row.key] = get(row, 'doc.tasks', [])
          return list
        }, {})
      }).then(list => {
        commit('setList', list)
      }).catch(error => {
        throw error
      })
    },
    saveTimeline: debounce(({ getters, rootState }) => {
      db.allDocs({
        include_docs: true,
        keys: weekDays(getters.timeline)
      }).then(result => {
        return result.rows.reduce((docs, row) => {
          const rev = get(row, 'value.rev')
          const doc = {
            _id: row.key,
            tasks: JSON.parse(JSON.stringify(rootState.list.list[row.key]))
          }

          if (rev) { doc['_rev'] = rev }
          docs.push(doc)

          return docs
        }, [])
      }).then(docs => {
        db.bulkDocs(docs)
      }).catch(error => {
        throw error
      })
    }, 300)
  }
}
