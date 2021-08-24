import { message } from 'antd';

export function isIE() {
  // 判断是否是IE
  const bw = window.navigator.userAgent;
  const compare = (s) => bw.indexOf(s) >= 0;
  const ie11 = (() => 'ActiveXObject' in window)();
  return compare('MSIE') || ie11;
}
export function isLogin() {
  //判断是否登录
  return localStorage.getItem('Authorization');
  // return true;
}

//导出
interface exportParam {
  url: string;
  params?: Object;
  fileName: string;
  timeOut?: Number;
  method?: 'POST' | 'GET';
}
//发送请求
function requestExport(url, params, method, signal, controller) {
  return new Promise((resolve) => {
    let options: any = {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json;application/octet-stream',
        'Authorization': localStorage.getItem('Authorization')
      }),
      signal: signal
    };
    if (method === 'POST') {
      options.body = JSON.stringify(params);
    }
    console.log('options', options);
    fetch(url, { ...options })
      .then((response) => {
        const { ok } = response;
        if (!ok) {
          message.error('网络错误');
          controller.abort();
          throw '网络错误';
        }
        return response;
      })
      .then((res) => res.blob())
      .catch((error) => {
        throw error;
      })
      .then((response) => {
        resolve(response);
      });
  });
}
//超时处理
export function timeoutPromise(timeout, controller) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Response('timeout', { status: 521, statusText: 'timeout ' }));
      //超时自动关闭当前请求
      controller.abort();
    }, timeout);
  });
}
//下载导出文件
function download(blobs, fileName) {
  const defaultName = '未命名的导出文件';
  const blob = new Blob([blobs]);
  const name = `${fileName ? fileName : defaultName}.xlsx`;
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a');
    elink.download = name;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
}
export function commonExport({
  url,
  params,
  method = 'POST',
  fileName,
  timeOut
}: exportParam) {
  let controller = new AbortController();
  let signal = controller.signal;
  let time = timeOut ? timeOut : 60000;
  return Promise.race([
    requestExport(url, params, method, signal, controller),
    timeoutPromise(time, controller)
  ])
    .then((resp: any) => {
      download(resp, fileName);
    })
    .catch((err) => {
      throw err + '请求超时';
    });
}

// 前端字符串加密解密
export const enCodeStr = (str) => {
  const token = 'el';
  return btoa(`${str}${token}`);
};
export const deCodeStr = (str) => {
  const token = 'el';
  return atob(str).replace(token, '');
};
