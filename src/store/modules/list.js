import Vue from 'vue'
import moment from 'moment'
import { isUndefined } from 'lodash'
import { previousTask, nextTask } from '../helpers'

export default {
  state: {
    activeTask: null,
    activeDay: null,
    selectWithFocus: false,
    list: {}
  },
  getters: {
    activeTask: state => { return state.activeTask },
    list: state => { return state.list },
    listKey: (_, __, rootState) => {
      return moment(rootState.timeline.timelineDate).format('YYYY-w')
    },
    selectWithFocus: state => { return state.selectWithFocus }
  },
  mutations: {
    setList (state, list) {
      state.list = list
    },
    createTask (state, { day, body, insertBefore }) {
      const dayList = state.list[day]
      const newTask = {
        body: body,
        completion: false
      }

      if (state.activeTask) {
        if (insertBefore) {
          newTask.completion = state.activeTask.completion
          state.activeTask.completion = false
        }
        dayList.splice(dayList.indexOf(state.activeTask) + 1, 0, newTask)
      } else {
        dayList.push(newTask)
      }

      state.activeTask = dayList[dayList.indexOf(newTask)]
    },
    updateTaskCompletion ({ activeTask }, completion) {
      Vue.set(activeTask, 'completion', completion)
    },
    updateTaskBody ({ activeTask }, body) {
      Vue.set(activeTask, 'body', body)
    },
    updateTaskNote ({ activeTask }, note) {
      Vue.set(activeTask, 'note', note)
    },
    toggleTask (state, task) {
      task.completion = !task.completion
    },
    selectTask (state, { day, task, withFocus }) {
      state.activeDay = day
      state.activeTask = task
      state.selectWithFocus = withFocus
    },
    selectPreviousTask (state) {
      const task = previousTask(state)

      if (task) {
        state.activeTask = task
        state.selectWithFocus = true
      }
    },
    selectNextTask (state) {
      const task = nextTask(state)

      if (task) {
        state.activeTask = task
        state.selectWithFocus = true
      }
    },
    removeTask (state) {
      const task = previousTask(state, (state) => {
        const dayList = state.list[state.activeDay]
        const index = dayList.indexOf(state.activeTask)
        dayList.splice(index, 1)
      })

      if (task) { state.activeTask = task } else {
        state.activeTask = nextTask(state)
      }
    },
    joinTasks (state) {
      const task = previousTask(state)

      if (task) {
        task.body = task.body.concat(state.activeTask.body)
      }
    }
  },
  actions: {
    joinTasks ({ commit, dispatch }, { caretOffset }) {
      commit('joinTasks')
      commit('removeTask')
      commit('setCaretOffset', caretOffset)
      dispatch('saveTimeline')
    },
    updateTask ({ commit, dispatch }, { body, completion, note }) {
      if (!isUndefined(body)) { commit('updateTaskBody', body) }
      if (!isUndefined(completion)) { commit('updateTaskCompletion', completion) }
      if (!isUndefined(note)) { commit('updateTaskNote', note) }
      dispatch('saveTimeline')
    },
    toggleTask ({ commit, dispatch }, task) {
      commit('toggleTask', task)
      dispatch('saveTimeline')
    },
    createTask ({ commit, dispatch }, { day, body = '', caretOffset = 0, insertBefore = false }) {
      commit('createTask', { day, body, insertBefore })
      commit('setCaretOffset', caretOffset)
      dispatch('saveTimeline')
    },
    selectTask ({ commit }, { day, task, withFocus }) {
      commit('selectTask', { day, task, withFocus })
    },
    selectPreviousTask ({ commit }) {
      commit('selectPreviousTask')
    },
    selectNextTask ({ commit }) {
      commit('selectNextTask')
    },
    deselectTask ({ commit }) {
      commit('selectTask', { day: null, task: null, withFocus: false })
    }
  }
}
