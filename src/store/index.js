import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import timeline from './modules/timeline'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    list: list,
    timeline: timeline
  }
})
