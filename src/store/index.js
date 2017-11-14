import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

export default new Vuex.Store({
  state,
  // state: {
  //   
  
  //   searchVal: {
  //     subjects: []
  //   },
  //   paddTop: true,
  
  //   revDate: {
  //     review: {
  //       author: {
  //         avatar: ''
  //       }
  //     },
  //     loading: true
  //   },

  //   movieLoad: {
  //     load: true,
  //     con: false
  //   },
  //   searchLoad: {
  //     load: true,
  //     con: false
  //   },
  // },
  getters,
  mutations,
  // mutations: {
  //   setMovieId(state, id) {
  //     state.movieId = id;
  //   },
  //   
  //   setLoding(state) {
  //     state.movieLoad.load = true;
  //     state.movieLoad.con = false;
  //   },
  //   
  //   
  //   searchLoding(state) {
  //     state.searchLoad.load = true;
  //     state.searchLoad.con = false;
  //   },
  //   revLoading(state) {
  //     state.revDate.loading = true;
  //   },
  //   //更新电影数据
  //   movieView(state, movieId) {
  //     fetch(`/api/movie/subject/${movieId}?apikey=${state.key}`).then(res => {
  //       return res.json();
  //     }).then((data) => {
  //       state.movieMess = data;
  //       state.movieLoad.load = false;
  //       state.movieLoad.con = true;
  //     });
  //   },
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
  //     fetch(`/api/movie/review/${revId}?apikey=${state.key}`).then(res => {
  //       return res.json();
  //     }).then((data) => {
  //       state.revDate.review = data;
  //       state.revDate.loading = false;
  //     });
  //   }
  // },
  actions

  // actions: {
    
  //   
  //   
  //   getMovieView({ commit }, id) {
  //     commit('movieView', id);
  //   },
  //   getMovieSearch({ commit }, val) {
  //     commit('movieSearch', val);
  //   },
  //   getMovieTag({ commit }, tag) {
  //     commit('movieTag', tag);
  //   },
  //   getReview({ commit }, id) {
  //     commit('review', id);
  //   }
  // }
});
