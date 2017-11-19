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
  [types.MOVIES_HOT](state, data) {
    state.moviesHotList = state.moviesHotList.concat(data.subjects);
    if (data.subjects.length === 0) {
      state.moviesHotMore = false;
    }
    state.moviesHotAdd = false;
    state.moviesHotLoading = false;
  },
  //热映加载
  [types.MOVIES_HOT_ADD](state) {
    state.moviesHotAdd = true;
  },
  //即将上映
  [types.MOVIES_COMING](state, data) {
    state.moviesComingList = state.moviesComingList.concat(data.subjects);
    if (data.subjects.length === 0) {
      state.moviesComingMore = false;
    }
    state.moviesComingAdd = false;
    state.moviesComingLoading = false;
  },
  //即将上映加载
  [types.MOVIES_COMING_ADD](state) {
    state.moviesComingAdd = true;
  },
  //top250
  [types.MOVIES_TOP250](state, data) {
    state.moviesTop250List = state.moviesTop250List.concat(data.subjects);
    if (data.subjects.length === 0) {
      state.moviesTop250More = false;
    }
    state.moviesTop250Add = false;
    state.moviesTop250Loading = false;
  },
  //top250加载
  [types.MOVIES_TOP250_ADD](state) {
    state.moviesTop250Add = true;
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
    if (data.comments.length === 0) {
      state.commentsMore = false;
    }
    state.commentsAdd = false;
  },
  //短评数据加载
  [types.COMMENTS_ADD](state) {
    state.commentsAdd = true;
  },
  //长评数据
  [types.MOVIE_REVIEWS](state, data) {
    state.reviewsList = state.reviewsList.concat(data.reviews);
    state.reviewsMess = data.subject;
    if (data.reviews.length === 0) {
      state.reviewsMore = false;
    }
    state.reviewsAdd = false;
  },
  //长评数据加载
  [types.REVIEWS_ADD](state) {
    state.reviewsAdd = true;
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
  //详细长评loadig
  [types.REVIEWS_FULL_LOADING](state) {
    state.reviewsFullLoading = true;
  },
  //电影搜索
  [types.MOVIE_SEARCH](state, data) {
    state.movieSearchData = state.movieSearchData.concat(data.subjects);
    //有时候中间数据缺失，不能比较获取到的length与count
    if (data.subjects.length === 0) {
      state.movieSearchMore = false;
    }
    state.movieSearchLoading = false;
    state.movieSearchAdd = false;
  },
  //清除搜索结果
  [types.MOVIE_SEARCH_CLEAN](state) {
    state.movieSearchData = [];
  },
  //电影搜索loading
  [types.MOVIE_SEARCH_LOADING](state) {
    state.movieSearchLoading = true;
  },
  [types.MOVIE_SEARCH_ADD](state) {
    state.movieSearchAdd = true;
  },
}
export default mutations
