import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab.js'
import tag from './tag.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
		tab,
		tag
  }
})
