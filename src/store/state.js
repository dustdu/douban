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
  hotData: {
    movieList: {},
    loading: true
  },
  //即将上映
  comingData: {
    movieList: {},
    loading: true
  },
  //top250
  top250Data: {
    movieList: {},
    loading: true
  },
  //电影信息
  movieData: {
    movieMess: {
      images: {
        large: ''
      }

    },
    loading: true
  }
};

export default state;
