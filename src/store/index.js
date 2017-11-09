import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
		key: '0b2bdeda43b5688921839c8ecb20399b',
        select: '/',
        title: '热映',
        movieId: '',
        imgWidth: 0,
        //使用数据时出现所需数据未定义
        movieMess: {
            images:{
                large: ''
			},
			durations:[],
			aka:[],
			countries:[],
			genres:[],
			rating: {
				average:[]
            },
            directors:[],
            casts:[],
            photos:[]
			
        },
        searchVal: {
            subjects:[]
        },
        bottom: true,
        header: true,
        back: false,
        search: true,
        paddTop: true,
        isHead: false,
        isSearch: true,
        //热映
        hotDate: {
            movieList: {},
            scrollTop: {},
            loading: {
                load: true,
                con: false
            },
        },
        //即将上映
        nextDate: {
            movieList: {},
            scrollTop: {},
            loading: {
                load: true,
                con: false
            }
        },
        // 排行榜
        topDate: {
            movieList: {},
            scrollTop: {},
            loading: {
                load: true,
                con: false
            }
        },
        //评论
        
        revDate: {
            review: {
                author: {
                    avatar: ''
                }
            },
            loading: true
        },
        
        movieLoad: {
            load: true,
            con: false
        },
        searchLoad: {
            load: true,
            con: false
        },
        scrollTop: {}
    },
    getters: {
		
        sevHeight: state=>{
            let sevHeight = 150 * state.searchVal.subjects.length + 54 +'px';
            return sevHeight;
        },
        hotHeight: state=>{
            let boxHeight = 150 * state.hotDate.movieList.subjects.length + 106 +'px';
            return boxHeight;
        },
        nextHeight: state=>{
            let boxHeight = 150 * state.nextDate.movieList.subjects.length + 106 +'px';
            return boxHeight;
        },
        topHeight: state=>{
            let boxHeight = 150 * state.topDate.movieList.subjects.length + 106 +'px';
            return boxHeight;
        },
    },
    mutations: {
        setMovieId(state,id){
            state.movieId = id;
        },
        setSelect(state,link){
            state.select = link;
        },
        setTitle(state,title){
            state.title = title;
        },
        setBottom(state,isHodden){
            state.bottom = isHodden;
        },
        setHeader(state,isHodden){
            state.header = isHodden;
        },
        setBack(state,isShow){
            state.back = isShow;
        },
        setHead(state,isHead){
            state.isHead = isHead;
        },
        setSearch(state,isSearch){
            state.isSearch = isSearch;
        },
        setLoding(state){
            state.movieLoad.load = true;
            state.movieLoad.con = false;
        },
        //页面销毁重置loading
        hotLoding(state){
            state.hotDate.loading.load = true;
            state.hotDate.loading.con = false;
        },
        nextLoding(state){
            state.nextDate.loading.load = true;
            state.nextDate.loading.con = false;
        },
        topLoding(state){
            state.topDate.loading.load = true;
            state.topDate.loading.con = false;
        },
        searchLoding(state){
            state.searchLoad.load = true;
            state.searchLoad.con = false;
        },
        revLoading(state){
            state.revDate.loading = true;
        },
        hotMovies(state){
            fetch(`/api/movie/in_theaters?apikey=${state.key}`).then(res =>{
                return res.json();
            }).then((data)=>{
                fetch(`/api/movie/in_theaters?apikey=${state.key}&start=0&count=${data.total}`).then(res =>{
                    return res.json();
                }).then((data)=>{
                    state.hotDate.movieList=data;
                    state.hotDate.loading.load = false;
                    state.hotDate.loading.con = true;
                });
            });
        },
        comMovies(state){
            fetch(`/api/movie/coming_soon?apikey=${state.key}`).then(res =>{
                return res.json();
            }).then((data)=>{
                fetch(`/api/movie/coming_soon?apikey=${state.key}&start=0&count=${data.total}`).then(res =>{
                    return res.json();
                }).then((data)=>{
                    state.nextDate.movieList=data;
                    state.nextDate.loading.load = false;
                    state.nextDate.loading.con = true;
                });
            });
        },
        topMovies(state){
            fetch(`/api/movie/top250?apikey=${state.key}`).then(res =>{
                return res.json();
            }).then((data)=>{
                fetch(`/api/movie/top250?apikey=${state.key}&start=0&count=${data.total}`).then(res =>{
                    return res.json();
                }).then((data)=>{
                    state.topDate.movieList=data;
                    state.topDate.loading.load = false;
                    state.topDate.loading.con = true;
                });
            });
        },
        movieView(state,movieId){
            fetch(`/api/movie/subject/${movieId}?apikey=${state.key}`).then(res =>{return res.json();}).then((data)=>{
                state.movieMess = data;
                state.movieLoad.load = false;
                state.movieLoad.con = true;
            });
        },
        movieSearch(state,vSearch){
            fetch(`/api/movie/search?q=${vSearch}&apikey=${state.key}`).then(res =>{return res.json();}).then((data)=>{
                state.searchVal = data;
                state.searchLoad.load = false;
                state.searchLoad.con = true;
            });
        },
        movieTag(state,tag){
            fetch(`/api/movie/search?tag=${tag}&apikey=${state.key}`).then(res =>{return res.json();}).then((data)=>{
                state.searchVal = data;
                state.searchLoad.load = false;
                state.searchLoad.con = true;
            });
        },
        review(state,revId){
            fetch(`/api/movie/review/${revId}?apikey=${state.key}`).then(res =>{return res.json();}).then((data)=>{
                state.revDate.review = data;
                state.revDate.loading = false;
            });
        }
	},
        
    actions: {
        getHotMovies({commit}){
            commit('hotMovies');
        },
        getComMovies({commit}){
            commit('comMovies');
        },
        getTopMovies({commit}){
            commit('topMovies');
        },
        getMovieView({commit},id){
            commit('movieView',id);
        },
        getMovieSearch({commit},val){
            commit('movieSearch',val);
        },
        getMovieTag({commit},tag){
            commit('movieTag',tag);
        },
        getReview({commit},id){
            commit('review',id);
        }
    }
});