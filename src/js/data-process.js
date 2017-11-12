export function imgUrl(url) {
  if (url !== undefined) {
    let urlO = url.replace("https://", "https://images.weserv.nl/?url=");
    return urlO;
  }
}
