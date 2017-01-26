const calendarLocale = 'calendar-locale'

export default {
  state: {
    calendarLocale: window.localStorage.getItem(calendarLocale) || 'en-gb'
  },
  getters: {
    calendarLocale: state => { return state.calendarLocale }
  },
  mutations: {
    setCalendarLocale (state, locale) {
      state.calendarLocale = locale
      window.localStorage.setItem(calendarLocale, locale)
    }
  }
}
