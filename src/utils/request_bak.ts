import qs from 'qs';
export default function request(url, options) {
  // 拼接完整的url
  // Get的请求处理
//   !options.method ? (options.method = "GET") : null;
  // 如果options中具有params参数，进行处理
  if (Object.keys(options).indexOf('params') > -1) {
    if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.mothod)) {
      // 判断当前url中是否有问号，如果有，就用&，如果没有，就用问号，作为拼接参数的连接符
      const ask = url.includes("?") ? "&" : "?";
      // 如果请求时GET请求，把所有params参数添加到url中，通过qs库将对象拼接为xxx=xxx&yyy=yyy的格式
      url += `${ask}${qs.stringify(options.params)}`;
    }
    // params不是fetch中自带的有效参数，fetch不支持该参数，需要在发送请求前将其删除
    delete options.params;
  }

  /**
   * 合并配置项
   */
  options = Object.assign(
    {
      // 允许跨域携带资源凭证
      //   - include：无论同源不同源都可以
      //   - same-origin：同源可以，默认值 √
      //   - omit：都拒绝
      credentials: "include",
      // 设置请求头
      headers: {
        Authorization: localStorage.getItem('ACCESS_TOKEN')
      },
    },
    options
  );
  // 最后添加携带的数据格式，这个根据需求填写
  options.headers.Accept = "application/json";

  /**
   * 添加token
   */
  const token = localStorage.getItem("token");
  token && (options.headers.Authorization = token);

  /**
   * POST请求的处理
   */
  if (/^(POST|PUT)$/i.test(options.method)) {
    // 读取传入的数据格式类型参数type，如果没有传入type，默认为json格式
    !options.type ? (options.type = "json") : null;
    if (options.type === "urlencoded") {
      // 处理数据体，使用qs进行格式化
      options.headers["Content-Type"] = "application/x-www-form-urlencoded";
      options.body = qs.stringify(options.body);
    }
    if (options.type === "json") {
      // json格式使用JSON库进行格式化
      console.log(options)
      options.headers["Content-Type"] === "application/json";
      options.body = JSON.stringify(options.body);
    }
  }

  /**
   * 全部配置好之后，最后使用fetch发起一个请求，它本身需要传入一个url和一个options
   */
  return fetch(url, options)
    .then((response) => {
      // fetch与ajax(axios)不同，只要服务器有返回值，都是成功，没有返回值才算失败。
      // 所以要在这里进行处理所有返回的结果
      if (!/^(2|3)\d{2}$/.test(response.status.toString())) {
        // 失败的状态，非2|3开头的状态，进行处理
        switch (response.status) {
          case 401:
            // 权限不够，一般是未登录
            // ...
            break;
          case 403:
            // 服务器已经接受，但是拒绝访问，通常是登录过期
            // ...
            localStorage.removeItem("token");
            break;
          case 404:
            // 找不到资源
            // ...
            break;
        }
      }

      // 处理之后，将response的所有数据转换成json，客户端就可以拿到以json格式响应的所有数据
      return response.json();
    })
    .catch((error) => {
      // 服务器没有响应才会跳转到这里
      if (!window.navigator.onLine) {
        // 断网处理
        // ...
        return;
      }
      // 什么都没有，返回一个错误
      return Promise.reject(error);
    });
}
