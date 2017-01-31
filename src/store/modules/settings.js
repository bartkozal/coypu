import { getItem, setItem } from '../localstorage'

const calendarLocaleKey = 'calendar-locale'

export default {
  state: {
    calendarLocale: getItem(calendarLocaleKey) || 'en-gb'
  },
  getters: {
    calendarLocale: state => { return state.calendarLocale }
  },
  mutations: {
    setCalendarLocale (state, locale) {
      state.calendarLocale = locale
      setItem(calendarLocaleKey, locale)
    }
  }
}
