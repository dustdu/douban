import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/top'
import next from '@/components/next'
import hot from '@/components/hot'
import search from '@/components/search'
import comList from '@/components/com-list'
import movieShow from '@/components/movie-show'
import reviews from '@/components/reviews'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hot',
      component: hot
    },
    {
      path: '/next',
      name: 'next',
      component: next
    },
    {
      path: '/top',
      name: 'top',
      component: top
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/movie/:movieId',
      name: 'movieShow',
      component: movieShow
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
