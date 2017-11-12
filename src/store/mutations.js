import * as types from './mutation-types'

const mutations = {
    //导航栏和底栏
    [types.SHOW_HEADER](state,show){
        console.log(show);
        state.showHeader = show;
    },
    [types.SHOW_BACK](state,show){
        state.showBack = show;
    },
    [types.TITLE](state,title){
        state.title = title;
    },
    [types.HEAD_BACK](state,show){
        state.headBack = show;
    },
    [types.SHOW_SEARCH](state,show){
        state.showSearch = show;
    },
    [types.SHOW_BOTTOM](state,show){
        state.showBottom = show;
    },
    [types.SELECTED](state,link){
        state.selected = link;
    },
    //
    //热映
    [types.HOT_MOVIE](state,data){
        state.hotData.movieList = data;
        state.hotData.loading = false;
    },
    //即将上映
    [types.COMING_MOVIE](state,data){
        state.comingData.movieList = data;
        state.comingData.loading = false;
    },
    //top250
    [types.TOP250_MOVIE](state,data){
        state.top250Data.movieList = data;
        state.top250Data.loading = false;
    },
    //电影信息
    [types.MOVIE_VIEW](state,data){
        state.movieData.movieMess = data;
        state.movieData.loading = false;
    }

}
export default mutations