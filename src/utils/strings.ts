import { compile, pathToRegexp, Path, Key } from 'path-to-regexp';
import { parse, stringify } from 'qs';
import { curry, isNil, merge, zipObj } from 'ramda';

interface AnyObject {
  [x: string]: any;
}

// ----------------------------------------------------------------
// 字符串工具类 - 负责提供非业务耦合的各种字符串操作。
// ----------------------------------------------------------------

/**
 * 获取一个不会重复，自定义带scope的随机字符串(有利于项目维护等)。
 *
 * @param id
 * @returns {string}
 */
const getGuId = (id: any): string =>
  (id && id + '-') +
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

/**
 * 设置url上面参数 RESTful 无encode
 * 备注: 一般的默认行为是encode，但是
 * @returns {string} 成功设置后的路径
 */
const toUrl = curry((url: string, obj: AnyObject): string => {
  if (!url) {
    // eslint-disable-next-line
    throw 'Ineligible url to put RESTFul parameters.';
  }
  return compile(url, { encode: (value) => value })(obj);
});

/**
 * 设置url上面参数 RESTful
 * @returns {string} 成功设置后的路径
 */
const toUrlEnc = curry((url: string, obj: AnyObject): string => {
  if (!url) {
    // eslint-disable-next-line
    throw 'Ineligible url to put RESTFul parameters.';
  }
  return compile(url)(obj);
});

/**
 * 获取url上面参数 RESTful
 * @param {string} url - 指定路径
 * @param {string} expression - 过滤参数的正则表达式
 * (详见https://github.com/pillarjs/path-to-regexp)
 * @returns {Object} - 参数数组，按顺序从前到后排
 */
const fromUrl = (url: string = window.location.href, expression: Path = '') => {
  const keys: Key[] = []; // 利用第二步操作对该数组对象进行填充
  const rules = pathToRegexp(expression, keys); // [{ name: 'first', ... }, { name: 'second', ...}]
  const pathArray = rules.exec(url); // [url, str_1, str_2, ...]
  // 去除第一个解析项，默认为当前路径
  if (isNil(pathArray.shift())) {
    return {};
  }
  // = R.pipe(R.zip, R.fromPairs)
  return zipObj(
    keys.map((key) => `${key.name}`),
    pathArray.map((param) => window.decodeURIComponent(param))
  );
};

/**
 * 设置url上面参数 query string
 * @returns {string}
 * @param {string} url - 指定路径
 * @param {Object} obj - 待反序列化的对象
 * @returns {string}
 */
const toQs = curry((url: string, obj: AnyObject): string => {
  if (typeof url !== 'string') {
    // eslint-disable-next-line
    throw 'Ineligible url to combine query string. Check your service call method.';
  }
  const compileUrl = [url, stringify(obj)].join(
    url.indexOf('?') !== -1 ? '&' : '?'
  );
  return compileUrl.endsWith('?')
    ? compileUrl.substring(0, compileUrl.length - 1)
    : compileUrl;
});

/**
 * 获取url上面参数 query string
 * @param {string} url - 指定路径
 * @returns {Object} 这个函数参数只有1个，不做柯理化
 */
const fromQs = (url: string = window.location.href) => parse(url.split('?')[1]);

/**
 * 获取url上面参数 query string
 * @param {Object} queryObject - 需要回填数据的对象
 * @param {string} url - 指定路径
 * 注意: 为了实际应用中方便，该变量中的数值类型为自动转换 如果不希望自动转换 则请使用fromQs自行处理!!
 * @returns {Object}
 */
const fromQsToObj = (
  url: string = window.location.href,
  queryObject: AnyObject
) => merge(queryObject, fromQs(url));

/**
 * 连字符转驼峰
 * @param   {String} str 要格式化的字符串
 * @return  {String} 格式化后的驼峰字符串
 */
const toCamelCase = (str: string): string => {
  const s =
    str &&
    (
      str.match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      ) || []
    )
      .map(
        (x: string) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()
      )
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

// 将数据库表字段转为驼峰
const dbToCamelCase = (str: string): string => {
  const s =
    str &&
    (str.match(/[a-zA-Z0-9]*/g) || [])
      .filter(Boolean)
      .map((x: string, index: number) => {
        if (index === 0) {
          x = x.toLowerCase();
        } else {
          x = x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase();
        }
        return x;
      })
      .join('');
  return s;
};

export default {
  getGuId,
  toUrl,
  toUrlEnc,
  fromUrl,
  toQs,
  fromQs,
  fromQsToObj,
  toCamelCase,
  dbToCamelCase
};
