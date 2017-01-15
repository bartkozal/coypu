import sortBy from 'lodash/sortBy'
import isNil from 'lodash/isNil'

export default {
  state: {
    activeTask: null,
    tasks: []
  },
  getters: {
    activeTask: state => { return state.activeTask },
    tasks: state => { return state.tasks }
  },
  mutations: {
    createList (state, date) {
      const task = {
        body: '',
        completion: false,
        date: date
      }

      state.tasks.push(task)
      state.tasks = sortBy(state.tasks, ['date'])
      state.activeTask = task
    },
    createTask (state, { body, atIndex }) {
      const index = state.tasks.indexOf(state.activeTask)
      const newTask = {
        body: body,
        completion: false,
        date: state.activeTask.date
      }

      state.tasks.splice(index + atIndex, 0, newTask)
      state.activeTask = state.tasks[state.tasks.indexOf(newTask)]
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
    removeTask (state) {
      const index = state.tasks.indexOf(state.activeTask)
      const task = state.tasks[index - 1]

      state.tasks.splice(index, 1)
      if (!isNil(task)) { state.activeTask = task }
    },
    selectTask (state, task) {
      state.activeTask = task
    },
    selectPreviousTask (state) {
      const index = state.tasks.indexOf(state.activeTask)
      const task = state.tasks[index - 1]

      if (!isNil(task)) { state.activeTask = task }
    },
    selectNextTask (state) {
      const index = state.tasks.indexOf(state.activeTask)
      const task = state.tasks[index + 1]

      if (!isNil(task)) { state.activeTask = task }
    },
    joinToPreviousTask (state) {
      const index = state.tasks.indexOf(state.activeTask)
      const previousTask = state.tasks[index - 1]

      if (!isNil(previousTask)) {
        previousTask.body = previousTask.body.concat(state.activeTask.body)
      }
    }
  },
  actions: {
    joinTasks ({ commit, dispatch }, { offset }) {
      commit('joinToPreviousTask')
      commit('removeTask')
      dispatch('setCaretOffset', offset)
    },
    updateTask ({ commit, dispatch }, { body, completion }) {
      if (!isNil(body)) { commit('updateTaskBody', body) }
      if (!isNil(completion)) { commit('updateTaskCompletion', completion) }
      dispatch('saveActiveList')
    },
    toggleTask ({ commit, dispatch }, task) {
      commit('toggleTask', task)
      dispatch('saveActiveList')
    },
    createTask ({ commit, dispatch }, { body = '', atIndex = 1, offset = 0 }) {
      commit('createTask', { body, atIndex })
      dispatch('setCaretOffset', offset)
    },
    selectTask ({ commit }, task) {
      commit('selectTask', task)
    },
    selectPreviousTask ({ commit }) {
      commit('selectPreviousTask')
    },
    selectNextTask ({ commit }) {
      commit('selectNextTask')
    },
    deselectTask ({ commit }) {
      commit('selectTask', null)
    }
  }
}
