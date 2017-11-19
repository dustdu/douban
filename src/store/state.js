const state = {
  //导航栏和底栏
  showHeader: true,
  showBack: false,
  title: '热映',
  headBack: false,
  showSearch: true,
  showBottom: true,
  selected: '/hot',
  bodyTop: '46px',
  bodyBottom: '53px',
  //
  //热映
  //moviesHotMess: {},
  moviesHotList: [],
  moviesHotAdd: false,
  moviesHotMore: true,
  moviesHotLoading: true,
  //
  //即将上映
  //moviesComingMess: {},
  moviesComingList: [],
  moviesComingAdd: false,
  moviesComingMore: true,
  moviesComingLoading: true,
  //
  //top250
  //moviesTop250Mess: {},
  moviesTop250List: [],
  moviesTop250Add: false,
  moviesTop250More: true,
  moviesTop250Loading: true,
  //
  //电影信息
  movieData: {
    movieMess: {
      images: {
        large: ''
      }
    },
    loading: true
  },
  //短评
  commentsMess: {},
  commentsList: [],
  commentsAdd: false,
  commentsMore: true,
  //长评
  reviewsMess: {},
  reviewsList: [],
  reviewsAdd: false,
  reviewsMore: true,
  //完整长评
  reviewsFull: {},
  reviewsFullLoading: true,
  //电影搜索
  movieSearchData: [],
  movieSearchLoading: true,
  movieSearchAdd: false,
  movieSearchMore: true
};

export default state;
