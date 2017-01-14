import sortBy from 'lodash/sortBy'
import isUndefined from 'lodash/isUndefined'

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
    createTask (state, { atIndex }) {
      const index = state.tasks.indexOf(state.activeTask)
      const newTask = {
        body: '',
        completion: false,
        date: state.activeTask.date
      }

      state.tasks.splice(index + atIndex, 0, newTask)
      state.activeTask = state.tasks[state.tasks.indexOf(newTask)]
    },
    updateTaskCompletion ({ tasks }, { task, completion }) {
      tasks[tasks.indexOf(task)].completion = completion
    },
    updateTaskBody ({ activeTask }, body) {
      activeTask.body = body
    },
    removeTask (state) {
      const index = state.tasks.indexOf(state.activeTask)
      const task = state.tasks[index - 1]

      state.tasks.splice(index, 1)
      if (!isUndefined(task)) { state.activeTask = task }
    },
    selectTask (state, task) {
      state.activeTask = task
    },
    selectPreviousTask (state) {
      const index = state.tasks.indexOf(state.activeTask)
      const task = state.tasks[index - 1]

      if (!isUndefined(task)) { state.activeTask = task }
    },
    selectNextTask (state) {
      const index = state.tasks.indexOf(state.activeTask)
      const task = state.tasks[index + 1]

      if (!isUndefined(task)) { state.activeTask = task }
    }
  }
}
