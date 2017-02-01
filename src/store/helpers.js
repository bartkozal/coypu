import moment from 'moment'
import { extendMoment } from 'moment-range'

export const previousTask = state => {
  const dayList = state.list[state.activeDay]
  const index = dayList.indexOf(state.activeTask)

  return dayList[index - 1]
}

export const nextTask = state => {
  const dayList = state.list[state.activeDay]
  const index = dayList.indexOf(state.activeTask)

  return dayList[index + 1]
}

export const weekDays = timeline => {
  const dayFormat = 'YYYY-MM-DD'
  const startOfWeek = timeline.startOf('week').format(dayFormat)
  const endOfWeek = timeline.endOf('week').format(dayFormat)
  const week = extendMoment(moment).range(startOfWeek, endOfWeek).by('days')

  return Array.from(week).map(day => day.format(dayFormat))
}
