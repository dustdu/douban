import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

export default new Vuex.Store({
  state,
  getters,
  mutations,
 
 
  //   movieSearch(state, vSearch) {
  //     fetch(`/api/movie/search?q=${vSearch}&apikey=${state.key}`).then(res => {
  //       return res.json();
  //     }).then((data) => {
  //       state.searchVal = data;
  //       state.searchLoad.load = false;
  //       state.searchLoad.con = true;
  //     });
  //   },
  //   movieTag(state, tag) {
  //     fetch(`/api/movie/search?tag=${tag}&apikey=${state.key}`).then(res => {
  //       return res.json();
  //     }).then((data) => {
  //       state.searchVal = data;
  //       state.searchLoad.load = false;
  //       state.searchLoad.con = true;
  //     });
  //   },
  //   review(state, revId) {
  //.then((data) => {
  //       state.revDate.review = data;
  //       state.revDate.loading = false;
  //     });
  //   }
  // },
  actions
});
