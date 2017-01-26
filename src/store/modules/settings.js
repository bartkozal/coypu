const settingsCalendar = 'settings-calendar'

export default {
  state: {
    calendar: window.localStorage.getItem(settingsCalendar) || 'en-gb'
  },
  getters: {
    calendar: state => { return state.calendar }
  },
  mutations: {
    setCalendar (state, calendar) {
      state.calendar = calendar
      window.localStorage.setItem(settingsCalendar, calendar)
    }
  }
}
