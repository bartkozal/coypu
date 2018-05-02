import { getItem, setItem } from '../localstorage'

const calendarLocaleKey = 'calendar-locale'
const hideCompletedKey = 'hide-completed'

export default {
  state: {
    calendarLocale: getItem(calendarLocaleKey) || 'en-gb',
    hideCompleted: getItem(hideCompletedKey) || false
  },
  getters: {
    calendarLocale: state => { return state.calendarLocale },
    hideCompleted: state => { return state.hideCompleted }
  },
  mutations: {
    setCalendarLocale (state, locale) {
      state.calendarLocale = locale
      setItem(calendarLocaleKey, locale)
    },
    setHideCompleted  (state, hideCompleted) {
      state.hideCompleted = hideCompleted
      setItem(hideCompletedKey, hideCompleted)
    }
  }
}
