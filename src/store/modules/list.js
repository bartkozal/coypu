import groupBy from 'lodash/groupBy'
import isUndefined from 'lodash/isUndefined'

export default {
  state: {
    activeTask: null,
    tasks: [
      {
        body: 'go to gym',
        completion: true,
        date: '2016-12-27'
      },
      {
        body: 'pay tax for November',
        completion: true,
        date: '2016-12-27'
      },
      {
        body: 'take yoga lesson',
        completion: false,
        date: '2016-12-27'
      },
      {
        body: 'call mum',
        completion: false,
        date: '2016-12-27'
      },
      {
        body: 'lunch with bruh',
        completion: false,
        date: '2016-12-28'
      },
      {
        body: 'go to gym',
        completion: true,
        date: '2016-12-28'
      },
      {
        body: 'update webpage',
        completion: true,
        date: '2016-12-28'
      },
      {
        body: 'buy a birthday gift for LS',
        completion: false,
        date: '2016-12-28'
      }
    ]
  },
  getters: {
    list: state => { return groupBy(state.tasks, 'date') },
    activeTask: state => { return state.activeTask }
  },
  mutations: {
    createTask (state) {
      const index = state.tasks.indexOf(state.activeTask)
      state.tasks.splice(index + 1, 0, {
        body: '',
        completion: false,
        date: state.activeTask.date
      })

      state.activeTask = state.tasks[index + 1]
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
    focusTask (state, task) {
      state.activeTask = task
    },
    focusPreviousTask (state) {
      const index = state.tasks.indexOf(state.activeTask)
      const task = state.tasks[index - 1]

      if (!isUndefined(task)) { state.activeTask = task }
    },
    focusNextTask (state) {
      const index = state.tasks.indexOf(state.activeTask)
      const task = state.tasks[index + 1]

      if (!isUndefined(task)) { state.activeTask = task }
    }
  }
}
