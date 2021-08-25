import {
  Fraction,
  BigNumber,
  MathArray,
  Matrix,
  add,
  subtract,
  multiply,
  divide,
  bignumber,
  round
} from 'mathjs';
import { compose, curry, fromPairs, keys } from 'ramda';
import SnowFlake from './snowflake';

// tag:: 取自 telework-web
// ----------------------------------------------------------------
// 数学计算工具类 - 处理高精度计算或者数字转化，提供数学算法。
// ----------------------------------------------------------------

type MType =
  | number
  | string
  | Fraction
  | BigNumber
  | MathArray
  | Matrix
  | boolean
  | Fraction
  | null;

// 高精度计算 - 内部统一返回BigDecimal，再统一转成number类型。
const basicHpOperations = ((maths) =>
  fromPairs(
    keys(maths).map((operation) => [
      operation,
      curry(compose(parseFloat, (bn) => bn.toString(), maths[operation]))
    ])
  ))({
    // 高精度加法
    add: (sbj: MType, acc: MType) => {
      return add(bignumber(sbj), bignumber(acc));
    },
    // 高精度减法
    sub: (sbj: MType, acc: MType) => {
      return subtract(bignumber(sbj), bignumber(acc));
    },
    // 高精度乘法
    mul: (sbj: MType, acc: MType) => {
      return multiply(bignumber(sbj), bignumber(acc));
    },
    // 高精度除法
    div: (sbj: MType, acc: MType) => {
      return divide(bignumber(sbj), bignumber(acc));
    }
  });
// 将内部计算解构成4种计算 - 注意 为了防止精度丢失，全部为string类型返回
const { add: hpAdd, sub, mul, div } = basicHpOperations;
// 包裹一层，给个初值
const wrapperAdd = (sbj = 0, acc = 0) => hpAdd(sbj, acc);
const wrapperSub = (sbj = 0, acc = 0) => sub(sbj, acc);
const wrapperMul = (sbj = 0, acc = 0) => mul(sbj, acc);
const wrapperDiv = (sbj = 0, acc = 0) => div(sbj, acc);

// 四舍五入
const rounds = (val: number, ex: number) => round(val, ex);

const fixedZero = (val: number) => {
  return val * 1 < 10 ? `0${val}` : val;
};

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @param {number} precision - float point
 * @return {String} a random floating point number
 */
const getRandomFlt = ({ min = 0, max = 1, precision = 2 }) => {
  return (Math.random() * (max - min) + min).toFixed(precision);
};

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {string} a random integer
 */
const getRandomInt = ({ min, max }: { min?: number; max?: number }) =>
  getRandomFlt({ min, max, precision: 0 });

/**
 * 检查某个值是否是数字
 * @param candidate
 * @return {boolean}
 */
const checkIfNumber = (candidate: any) =>
  typeof candidate === 'number' || +candidate + '' === candidate;

/**
 * 检查一个变量是否是数字（不一定是数字类型）
 * 如果是的话，返回解析结果，不是则返回原变量
 * @param candidate - 带判断变量
 * @returns {number | any}
 */
const parseIfNumeric = (candidate: any) =>
  // Number(parseFloat(candidate)) === +candidate
  checkIfNumber(candidate) ? +candidate : candidate;

/**
 * 生成一个不重复的ID(数字类型，以便于后端接收)
 * 该方法与stringUtils中的getUid不可混用
 */
const genFakeId = (sign = 1) => sign * ~~(Math.random() * 100000000); // '~~' ~是按位取反的意思，计算机里面处理二进制数据时候的非，~~就是再转回来，利用两个按位取反的符号，进行类型的转换，转换成数字符号。
/***
~~false === 0
~~true === 1
~~undefined === 0
~~!undefined === 1
~~null === 0
~~!null === 1
~~"" === 0
~~!"" === 1
*/
const getSnowFlake = SnowFlake.getSnowFlake;

export default {
  add: wrapperAdd,
  sub: wrapperSub,
  mul: wrapperMul,
  div: wrapperDiv,
  parseIfNumeric, // 同上
  checkIfNumber,
  getRandomInt,
  getRandomFlt,
  fixedZero,
  genFakeId,
  getSnowFlake,
  rounds
};
