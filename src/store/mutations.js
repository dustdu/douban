import * as types from './mutation-types'

const mutations = {
  //导航栏和底栏
  [types.SHOW_HEADER](state, show) {
    state.showHeader = show;
  },
  [types.SHOW_BACK](state, show) {
    state.showBack = show;
  },
  [types.TITLE](state, title) {
    state.title = title;
  },
  [types.HEAD_BACK](state, show) {
    state.headBack = show;
  },
  [types.SHOW_SEARCH](state, show) {
    state.showSearch = show;
  },
  [types.SHOW_BOTTOM](state, show) {
    state.showBottom = show;
  },
  [types.SELECTED](state, link) {
    state.selected = link;
  },
  [types.BODY_TOP](state, top) {
    state.bodyTop = top;
  },
  [types.BODY_BOTTOM](state, bottom) {
    state.bodyBottom = bottom;
  },
  //
  //热映
  [types.HOT_MOVIE](state, data) {
    state.hotData.movieList = data;
    state.hotData.loading = false;
  },
  //即将上映
  [types.COMING_MOVIE](state, data) {
    state.comingData.movieList = data;
    state.comingData.loading = false;
  },
  //top250
  [types.TOP250_MOVIE](state, data) {
    state.top250Data.movieList = data;
    state.top250Data.loading = false;
  },
  //电影信息
  [types.MOVIE_VIEW](state, data) {
    state.movieData.movieMess = data;
    state.movieData.loading = false;
  },
  //电影loading
  [types.MOVIE_LOADING](state) {
    state.movieData.loading = true;
  },
  //短评数据
  [types.MOVIE_COMMENTS](state, data) {
    state.commentsList = state.commentsList.concat(data.comments);
    state.commentsMess = data.subject;
    if (data.comments.length < data.count) {
      state.commentsMore = false;
    }
    state.commentsLoading = true;
  },
  //短评数据加载loading
  [types.COMMENTS_LOADING](state) {
    state.commentsLoading = false;
  },
  //长评数据
  [types.MOVIE_REVIEWS](state, data) {
    state.reviewsList = state.reviewsList.concat(data.reviews);
    state.reviewsMess = data.subject;
    if (data.reviews.length < data.count) {
      state.reviewsMore = false;
    }
    state.reviewsLoading = true;
  },
  //长评数据加载loading
  [types.REVIEWS_LOADING](state) {
    state.reviewsLoading = false;
  },
  //清除评论信息
  [types.COMMENTS_CLEAN](state) {
    state.commentsList = [];
    state.reviewsList = [];
  },
  //详细长评
  [types.REVIEWS_FULL](state, data) {
    state.reviewsFull = data;
    state.reviewsFullLoading = false;
  },
  [types.REVIEWS_FULL_LOADING](state) {
    state.reviewsFullLoading = true;
  }

}
export default mutations
