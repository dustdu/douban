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
export const getMovieView = ({ commit },movieId) => {
    getData.getMovieView(movieId).then((data) => {
        commit(types.MOVIE_VIEW,data);
    });
}
//短评数据
export const getMovieComments = ({ commit },params) => {
    getData.getMovieComments(params).then((data) => {
        setTimeout(() => {
            commit(types.MOVIE_COMMENTS,data);
        }, 500);
    });
}
//长评数据
export const getMovieReviews = ({ commit },params) => {
    getData.getMovieReviews(params).then((data) => {
        setTimeout(() => {
            console.log(55)
            commit(types.MOVIE_REVIEWS,data);
        }, 500);
    });
}


