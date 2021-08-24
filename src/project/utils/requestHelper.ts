const notChangeHead = ['/yd-user', '/122'];
// 自动替换url里面的前缀，可以指定某些前缀不替换。放到request.ts 中的request函数第一行
// url = rewriteUrl(url);
let rewriteUrl = (url) => {
  let spUrl = _splitUrl(url);
  if (spUrl == null) {
    return url;
  }
  let { headUrl, baseUrl } = spUrl;
  // 不修改的url前缀
  if (notChangeHead.find((a) => a == headUrl)) {
    return url;
  }
  return '/yd-user' + baseUrl;
};

const _splitUrl = (url) => {
  if (url == null) {
    return null;
  }
  let firstIndex = url.indexOf('/');
  if (firstIndex < 0) {
    return null;
  }
  let secIndex = url.indexOf('/', firstIndex + 1);
  if (secIndex < 0) {
    return null;
  }
  let baseUrl = url.substr(secIndex);
  let headUrl = url.substring(firstIndex, secIndex);

  return { headUrl, baseUrl };
};

// 是否供应链
const _midGroundHeadList = ['/yd-pur', '/yd-inv', 'yd-sale'];
let isMiddleGround = (url) => {
  let spUrl = _splitUrl(url);
  if (spUrl == null) {
    return false;
  }
  let { headUrl, baseUrl } = spUrl;

  if (_containUrlHead(headUrl, _midGroundHeadList)) {
    return true;
  }
  return false;
};

const _containUrlHead = (headUrl, headList) => {
  let obj = headList.find((a) => a == headUrl);
  if (obj != null) {
    return true;
  }

  headUrl = headUrl.replaceAll('/', '');
  obj = headList.find((a) => a == headUrl);
  return obj != null;
};

const _expectUrlHeadList = [];
let needToken = (url) => {
  let spUrl = _splitUrl(url);
  if (spUrl == null) {
    return false;
  }
  let { headUrl, baseUrl } = spUrl;

  if (_containUrlHead(headUrl, _expectUrlHeadList)) {
    return false;
  }
  return true;
};

// 一般来说，前后空格只在用户输入的时候才会出现。
const dataFieldTrim = function (data) {
  if (typeof data != 'object') {
    return;
  }
  _trimObject(data);
};

const _trimObject = function (obj) {
  if (typeof obj != 'object') {
    return;
  }
  for (const key in obj) {
    _trimDispatch(obj, key);
  }
};
const _trimList = function (list) {
  for (let index = 0; index < list.length; index++) {
    _trimDispatch(list, index);
  }
};

// 支持object和list
const _trimDispatch = function (obj, key) {
  const el = obj[key];
  let t = typeof el;
  if (t == 'string') {
    // 递归结束分支
    obj[key] = el.trim();
  } else if (Array.isArray(el)) {
    _trimList(el);
  } else if (t == 'object') {
    _trimObject(el);
  }
  // null/undefined 递归结束
};

export { rewriteUrl, isMiddleGround, needToken, dataFieldTrim };
