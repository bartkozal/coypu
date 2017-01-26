import Vue from 'vue'
import Vuex from 'vuex'

import list from './modules/list'
import timeline from './modules/timeline'
import caret from './modules/caret'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    list,
    timeline,
    caret,
    settings
  }
})
