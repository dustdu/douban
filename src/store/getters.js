import * as dataProcess from '../js/data-process'
//背景图
export const wrapImg = state => {
    let wrapImg = state.movieData.movieMess.images;
    if (wrapImg) {
        return wrapImg.large?wrapImg.large:'';
    }
}
//处理电影名字
export const movieName = state => {
  let movieMess = state.movieData.movieMess;
  //起始数据无此键
  if (movieMess.aka) {
    let movieName = movieMess.original_title == movieMess.title ? movieMess.aka[0] : movieMess.original_title;
    return movieName;
  }
}
//片长
export const durations = state => {
    let durations = state.movieData.movieMess.durations;
    let durationsO = '';
    if (durations) {
        return durationsO = durations.length != 0?durations[0]:'片长未知';
    }
    
}
//处理制片国家/地区
export const countries = state => {
  let countries = state.movieData.movieMess.countries;
  if (countries) {
    return dataProcess.arrConnect(countries);
  }
}

//处理电影类型
export const genres = state => {
  let genres = state.movieData.movieMess.genres;
  if (genres) {
    return dataProcess.arrConnect(genres);
  }
}

//处理上映日期
export const pubdate = state => {
  let pubdate = state.movieData.movieMess.mainland_pubdate;
  if (pubdate === "") {
    pubdate = "暂无上映信息";
  } else {
    pubdate += " 中国上映";
  }
  return pubdate;
}
//评分补零
export const average = state => {
  let rating = state.movieData.movieMess.rating;
  if (rating) {
    return dataProcess.zeroFill(rating.average);
  }
}
//演职人员数据
export const actorData = state => {
  let directors = state.movieData.movieMess.directors;
  let casts = state.movieData.movieMess.casts;
  let directorsData = [];
  let castsData = [];
  if (directors) {
    directorsData = directors.map(item => {
      return {
        //图片地址为null
        img: item.avatars ? item.avatars.medium : '',
        //有时没有id
        id: item.id ? item.id : item.name,
        type: '导演',
        name: item.name ? item.name : ''
      }
    });
  }
  if (casts) {
    castsData = casts.map(item => {
      return {
        img: item.avatars ? item.avatars.medium : '',
        id: item.id ? item.id : item.name,
        type: '演员',
        name: item.name ? item.name : ''
      }
    });
  }

  let actorData = directorsData.concat(castsData);
  return actorData;

}
//演职人员实例化scroll时的宽度
export const actorWidth = state => {
  let directors = state.movieData.movieMess.directors;
  let casts = state.movieData.movieMess.casts;
  let directorsWidth = 0;
  let castsWidth = 0;
  if (directors) {
    directorsWidth = dataProcess.boxWidth(100, directors);
  }
  if (casts) {
    castsWidth = dataProcess.boxWidth(100, casts);
  }
  let boxWidth = (directorsWidth+castsWidth)+'px';
  return boxWidth;
}
//海报数据
export const postData = state => {
  let photos = state.movieData.movieMess.photos;
  if (photos) {
    let postData = photos.map(item => {
      return {
        img: item.cover,
        id: item.id,
        type: '',
        name: ''
      }
    });
    return postData;
  }

}
//海报实例化scroll时的宽度
export const postWidth = state => {
  let photos = state.movieData.movieMess.photos;
  if (photos) {
    return dataProcess.boxWidth(100, photos)+'px';
  }
}

//电影简介
export const summary = state => {
    let summary = state.movieData.movieMess.summary;
    if (summary) {
        return summary;
    }
}
