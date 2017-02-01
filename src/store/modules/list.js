import moment from 'moment'
import isNil from 'lodash/isNil'
import { previousTask, nextTask } from '../helpers'

export default {
  state: {
    activeTask: null,
    activeDay: null,
    list: {}
  },
  getters: {
    activeTask: state => { return state.activeTask },
    list: state => { return state.list },
    listKey: (_, __, rootState) => {
      return moment(rootState.timeline.timelineDate).format('YYYY-w')
    }
  },
  mutations: {
    setList (state, list) {
      state.list = list
    },
    createTask (state, { day, body }) {
      const dayList = state.list[day]
      const newTask = {
        body: body,
        completion: false
      }

      if (isNil(state.activeTask)) {
        dayList.push(newTask)
      } else {
        dayList.splice(dayList.indexOf(state.activeTask) + 1, 0, newTask)
      }

      state.activeTask = dayList[dayList.indexOf(newTask)]
    },
    updateTaskCompletion ({ activeTask }, completion) {
      activeTask.completion = completion
    },
    updateTaskBody ({ activeTask }, body) {
      activeTask.body = body
    },
    toggleTask (state, task) {
      task.completion = !task.completion
    },
    selectTask (state, { day, task }) {
      state.activeDay = day
      state.activeTask = task
    },
    selectPreviousTask (state) {
      const task = previousTask(state)

      if (!isNil(task)) { state.activeTask = task }
    },
    selectNextTask (state) {
      const task = nextTask(state)

      if (!isNil(task)) { state.activeTask = task }
    },
    removeTask (state) {
      const task = previousTask(state)

      // dayList.splice(index, 1)
      if (!isNil(task)) { state.activeTask = task }
    },
    joinToPreviousTask (state) {
      const task = previousTask(state)

      if (!isNil(task)) {
        task.body = task.body.concat(state.activeTask.body)
      }
    }
  },
  actions: {
    joinTasks ({ commit, dispatch }, { caretOffset }) {
      commit('joinToPreviousTask')
      commit('removeTask')
      commit('setCaretOffset', caretOffset)
    },
    updateTask ({ commit, dispatch }, { body, completion }) {
      if (!isNil(body)) { commit('updateTaskBody', body) }
      if (!isNil(completion)) { commit('updateTaskCompletion', completion) }
      dispatch('saveTimeline')
    },
    toggleTask ({ commit, dispatch }, task) {
      commit('toggleTask', task)
      dispatch('saveTimeline')
    },
    createTask ({ commit, dispatch }, { day, body = '', caretOffset = 0 }) {
      commit('createTask', { day, body })
      commit('setCaretOffset', caretOffset)
    },
    selectTask ({ commit }, { day, task }) {
      commit('selectTask', { day, task })
    },
    selectPreviousTask ({ commit }) {
      commit('selectPreviousTask')
    },
    selectNextTask ({ commit }) {
      commit('selectNextTask')
    },
    deselectTask ({ commit }) {
      commit('selectTask', { day: null, task: null })
    }
  }
}
