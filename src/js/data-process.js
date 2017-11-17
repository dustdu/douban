//处理图片防外链设置
export function imgUrl(url) {
  if (url !== undefined) {
    let urlO = url.replace("https://", "https://images.weserv.nl/?url=");
    return urlO;
  }
}
//处理数组类数据
export function arrConnect(arr) {
  let str = '';
  arr.forEach((item, index) => {
    if (index > 0) {
      str += '/';
    }
    str += item;
  });
  return str;
}
//数字补零
export function zeroFill(num) {
  num = num.toString();
  if (num.length == 1) {
    num += '.0';
  }
  return num;
}
//计算宽度
export function boxWidth(width, arr) {
  let boxWidth = width * arr.length;
  return boxWidth;
}
//处理请求数据的参数
export function params(start, startCount,count) {
  let newStart = 0;
  if (start >= startCount) {
    return newStart = start+ count;
  } else {
    return newStart = startCount;
  }
}
