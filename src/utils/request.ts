// import qs from 'qs';
import { message } from 'antd';
//处理promise和fetch的兼容性以及引入
require('es6-promise').polyfill();
require('isomorphic-fetch');
import { timeoutPromise } from './utils';
import { needToken, dataFieldTrim } from '@/project/utils/requestHelper';
// const startCode = process.env.REACT_APP_SECRET_CODE; //查看是什么
// const startCode = process.env; //查看是什么
console.log(process.env.REACT_APP_BASE_URL);
// console.log('startCodestartCode', startCode);
console.log('startCodestartCode', process.env);

// let prefixStr =
//   startCode === 'b2c'
//     ? '/yd-user'
//     : startCode === 'support-domain'
//     ? '/yd-user'
//     : '/api';

let prefixStr = '';

let timeout = 60000; // 请求超时时间
let controller;
//处理get请求，传入参数对象拼接
let formatUrl = (obj) => {
  let params: any = Object.values(obj).reduce(
    (a, b, i) => `${a}${Object.keys(obj)[i]}=${b}&`,
    '?'
  );
  return params.substring(0, params.length - 1);
};

//response 转化
function parseJSON(response) {
  return response.json();
}
function parseBlob(response) {
  return response.blob();
}

let Fetch = (url, option: any = {}, signal) => {
  console.log('url', url);
  console.log('option', option);
  option.headers = option.headers || {};
  const token = window.localStorage.getItem('Authorization');
  if (token && needToken(url)) {
    option.headers['Authorization'] = token;
  }
  const m = (option.method || '').toLocaleLowerCase();
  // 处理消息字段中的前后空格
  dataFieldTrim(option.query);
  // get query format
  if (m === 'get') {
    if (option.query) {
      url = url + formatUrl(option.query);
    }
  }
  //对非get类请求头和请求体做处理
  if (m === 'post' || m === 'put' || m === 'delete' || m === 'patch') {
    if (option.query instanceof FormData) {
      // FormData
      option.body = option.query;
    } else {
      option.headers['Content-Type'] =
        option.headers['Content-Type'] || 'application/json';
      option.body = JSON.stringify(option.query); //根据后台要求，如果有时候是java请求会用qs转
    }
  }

  option.signal = signal;
  option.credentials = 'include';

  console.log('network->', prefixStr + url);
  console.log('netParams->', option.body);

  return new Promise((resolve, reject) => {
    fetch(url, option)
      .then((response) => {
        // console.log('111', response);
        //处理 浏览器 200 500 状态
        const { status } = response;
        if (status == 401) {
          message.error('登录超时，请重新登录：' + response.statusText);
          setTimeout(() => {
            return (window.location.href = '/login');
          }, 1000);
        }
        return response;
      })
      .then((res) => {
        // console.log('222', res);
        if (option.headers['Content-Type'] === 'application/octet-stream') {
          return parseBlob(res);
        } else if (option.headers['Content-Type'] === 'application/json') {
          return parseJSON(res);
        }
        return parseJSON(res);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log('err', error);
        reject(error);
      });
  });
};

// //超时处理
// let timeoutPromise = (timeout, controller) => {
//   console.log('timeouttimeout', timeout);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(new Response('timeout', { status: 521, statusText: 'timeout ' }));
//       //超时自动关闭当前请求
//       controller.abort();
//     }, timeout);
//   });
// };

let request = (url, option) => {
  // url = rewriteUrl(url);
  controller = new AbortController();
  let signal = controller.signal;
  return Promise.race([
    timeoutPromise(timeout, controller),
    Fetch(url, option, signal)
  ])
    .then((resp: any) => {
      // console.log("requests",resp);
      //在这里判断请求超时
      if (resp.status === 521) {
        message.error('请求超时');
        return {
          success: false,
          status: 521,
          msg: '请求超时'
        };
      }
      //令牌过期跳转到登陆页面
      if (resp?.code === 5105) {
        // 延时效果，为了能够看到抛出的提示
        setTimeout(() => {
          return (window.location.href = '/login');
        }, 1000);
      }

      if (resp?.code === 9913) {
        // 延时效果，为了能够看到抛出的提示
        setTimeout(() => {
          localStorage.removeItem('Authorization');
          return (window.location.href = `/login?redirectUrl=${window.location.pathname}`);
        }, 1000);
      }
      return resp;
    })
    .catch((error) => {
      console.log('requests', error);
      // return error;
      return {
        success: false,
        status: 521,
        msg: '系统错误，请联系管理员'
      };
    });
};

export default request;
