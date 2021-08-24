import { pathToRegexp } from 'path-to-regexp';
import { curry, type, isNil, isEmpty } from 'ramda';

/**
 * 比较两个url是否相等
 * @param subjectPath - 需要的url(正则)，参考: https://www.npmjs.com/package/path-to-regexp
 * @param currentLoc - 当前url
 * @returns {boolean}
 */
const isUrlEq = curry(
  (currentLoc, subjectPath) => !!pathToRegexp(subjectPath).exec(currentLoc)
);

/* eslint no-useless-escape:0 */
const _regUrl: RegExp = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

/**
 * 是否是合法的url路径
 * @param path - 待检查路径
 * @return {boolean}
 */
const isUrl = (path: any): boolean => {
  return _regUrl.test(path);
};

const isArray = (operation: any): boolean => type(operation) === 'Array';

const isObject = (operation: any): boolean => type(operation) === 'Object';

const isFunction = (operation: any): boolean => type(operation) === 'Function';

const isExist = (operation: any): boolean =>
  !isNil(operation) && !isEmpty(operation);

export default {
  isUrl,
  isUrlEq,
  isArray,
  isObject,
  isFunction,
  isExist
};
