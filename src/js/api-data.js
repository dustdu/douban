//使用豆瓣API时所需key
const apiKey = '0b2bdeda43b5688921839c8ecb20399b'
//热映电影api
export function getHotMovies(start, count) {
  return fetch(`/api/movie/in_theaters?apikey=${apiKey}&start=${start}&count=${count}`).then(res => {
    return res.json();
  });
}
//即将上映电影api
export function getComingMovies(start, count) {
  return fetch(`/api/movie/coming_soon?apikey=${apiKey}&start=${start}&count=${count}`).then(res => {
    return res.json();
  });
}
//top250api
export function getTop250Movies(start, count) {
  return fetch(`/api/movie/top250?apikey=${apiKey}&start=${start}&count=${count}`).then(res => {
    return res.json();
  });
}
//电影详细数据api
export function getMovieView(id) {
  return fetch(`/api/movie/subject/${id}?apikey=${apiKey}`).then(res => {
    return res.json();
  });
}