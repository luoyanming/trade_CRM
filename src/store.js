import Vue from 'vue'
import Vuex from 'vuex'
import state from './vuex/state'
import getters from './vuex/getters'
import mutations from './vuex/mutations'
import actions from './vuex/actions'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    state,
    getters,
    mutations,
    actions
})
