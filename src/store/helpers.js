import moment from 'moment'
import { isUndefined, values, flatten } from 'lodash'
import { extendMoment } from 'moment-range'

export const previousTask = (state, cb) => {
  const tasks = flatten(values(state.list))
  const index = tasks.indexOf(state.activeTask)

  if (!isUndefined(cb)) { cb(state) }

  return tasks[index - 1]
}

export const nextTask = (state, cb) => {
  const tasks = flatten(values(state.list))
  const index = tasks.indexOf(state.activeTask)

  if (!isUndefined(cb)) { cb(state) }

  return tasks[index + 1]
}

export const weekDays = timeline => {
  const dayFormat = 'YYYY-MM-DD'
  const startOfWeek = timeline.startOf('week').format(dayFormat)
  const endOfWeek = timeline.endOf('week').format(dayFormat)
  const week = extendMoment(moment).range(startOfWeek, endOfWeek).by('days')

  return Array.from(week).map(day => day.format(dayFormat))
}
