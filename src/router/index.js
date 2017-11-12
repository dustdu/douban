import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import MovieHot from '@/pages/movie-hot'
import MovieComing from '@/pages/movie-coming'
import MovieTop250 from '@/pages/movie-top250'
import MovieShow from '@/pages/movie-show'
import search from '@/components/search'
import comList from '@/components/com-list'
import reviews from '@/components/reviews'


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/hot'
    },
    {
      path: '/hot',
      name: 'hot',
      component: MovieHot
    },
    {
      path: '/coming',
      name: 'coming',
      component: MovieComing
    },
    {
      path: '/top250',
      name: 'top250',
      component: MovieTop250
    },
    {
      path: '/movie/:movieId',
      name: 'MovieShow',
      component: MovieShow
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    
    {
      path: '/movie/:movieId/comment',
      name: 'comList',
      component: comList
    },
    {
      path: '/movie/:movieId/reviews/:revId',
      name: 'reviews',
      component: reviews
    }
  ]
})
