import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import MovieHot from '@/pages/movie-hot'
import MovieComing from '@/pages/movie-coming'
import MovieTop250 from '@/pages/movie-top250'
import MovieShow from '@/pages/movie-show'
import MovieComments from '@/pages/movie-comments'
import Reviews from '@/pages/reviews'
import Search from '@/pages/movie-search'



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
      name: 'movieShow',
      component: MovieShow
    },
    {
      path: '/movie/:movieId/comments',
      name: 'movieComments',
      component: MovieComments
    },
    {
      path: '/movie/:movieId/reviews/:reviewsId',
      name: 'reviews',
      component: Reviews
    },
    {
      path: '/searchmovie',
      name: 'searchmovie',
      component: Search
    },
    
  ]
})
