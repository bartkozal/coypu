import sortBy from 'lodash/sortBy'
import isUndefined from 'lodash/isUndefined'

export default {
  state: {
    activeTask: null,
    tasks: [
      {
        body: 'go to gym',
        completion: true,
        date: '2017-01-03'
      },
      {
        body: 'pay tax for November',
        completion: true,
        date: '2017-01-03'
      },
      {
        body: 'take yoga lesson',
        completion: false,
        date: '2017-01-03'
      },
      {
        body: 'call mum',
        completion: false,
        date: '2017-01-03'
      },
      {
        body: 'lunch with bruh',
        completion: false,
        date: '2017-01-04'
      },
      {
        body: 'go to gym',
        completion: true,
        date: '2017-01-04'
      },
      {
        body: 'update webpage',
        completion: true,
        date: '2017-01-04'
      },
      {
        body: 'buy a birthday gift for LS',
        completion: false,
        date: '2017-01-04'
      }
    ]
  },
  getters: {
    activeTask: state => { return state.activeTask },
    tasks: state => { return state.tasks }
  },
  mutations: {
    createList (state, date) {
      state.tasks.push({
        body: '',
        completion: false,
        date: date
      })
      state.tasks = sortBy(state.tasks, ['date'])
    },
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
