//使用豆瓣API时所需key
const apiKey = '0b2bdeda43b5688921839c8ecb20399b'
//热映电影api
export function getHotMovies(params) {
  return fetch(`/api/movie/in_theaters?apikey=${apiKey}&start=${params.start}&count=${params.count}`).then(res => {
    return res.json();
  });
}
//即将上映电影api
export function getComingMovies(params) {
  return fetch(`/api/movie/coming_soon?apikey=${apiKey}&start=${params.start}&count=${params.count}`).then(res => {
    return res.json();
  });
}
//top250api
export function getTop250Movies(params) {
  return fetch(`/api/movie/top250?apikey=${apiKey}&start=${params.start}&count=${params.count}`).then(res => {
    return res.json();
  });
}
//电影详细数据api
export function getMovieView(movieId) {
  return fetch(`/api/movie/subject/${movieId}?apikey=${apiKey}`).then(res => {
    return res.json();
  });
}
//短评数据api
export function getMovieComments(params) {
  return fetch(`/api/movie/subject/${params.movieId}/comments?apikey=${apiKey}&start=${params.start}&count=${params.count}`).then(res => {
    return res.json();
  });
}
//长评数据api
export function getMovieReviews(params) {
  return fetch(`/api/movie/subject/${params.movieId}/reviews?apikey=${apiKey}&start=${params.start}&count=${params.count}`).then(res => {
    return res.json();
  });
}
//详细长评
export function getReviewsFull(reviewsId) {
  return fetch(`/api/movie/review/${reviewsId}?apikey=${apiKey}`).then(res => {
    return res.json();
  })
}
//电影搜索
export function searchMovies(params) {
  return fetch(`/api/movie/search?q=${params.value}&apikey=${apiKey}&start=${params.start}&count=${params.count}`).then(res => {
    return res.json();
  })
}
//电影tag
export function tagMovies(params) {
  return fetch(`/api/movie/search?tag=${params.tag}&apikey=${apiKey}&start=${params.start}&count=${params.count}`).then(res => {
    return res.json();
  })
}
