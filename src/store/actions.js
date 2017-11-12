import * as types from './mutation-types'
import * as getData from '../js/api-data'

//热映电影数据
export const getHotMovies = ({ commit }) => {
    getData.getHotMovies(0, 20).then((data) => {
        commit(types.HOT_MOVIE,data);
    });
}
//即将上映电影数据
export const getComingMovies = ({ commit }) => {
    getData.getComingMovies(0, 20).then((data) => {
        commit(types.COMING_MOVIE,data);
    });
}
//top250电影数据
export const getTop250Movies = ({ commit }) => {
    getData.getTop250Movies(0, 20).then((data) => {
        commit(types.TOP250_MOVIE,data);
    });
}
//电影详细数据
export const getMovieView = ({ commit },id) => {
    getData.getMovieView(id).then((data) => {
        commit(types.MOVIE_VIEW,data);
    });
}


