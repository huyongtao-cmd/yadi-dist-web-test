const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/yd-system', {
      //  target: 'http://192.168.1.202:9010', // 测试环境
      target: 'http://101.132.189.202:30223/yst/ydsystem', // 测试环境
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/yd-system': ''
      }
    }),
    createProxyMiddleware('/yd-user', {
      // target: 'http://192.168.0.210:8070', // 测试环境
      // target: 'http://192.168.1.41:8070', // 马世豪
      target: 'http://101.132.189.202:30223/yst/yduser', // 测试环境
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/yd-user': ''
      }
    }),
    createProxyMiddleware('/yd-inv', {
      // target: 'http://192.168.0.210:8082', // 测试环境
      target: 'http://101.132.189.202:30223/yst/ydinv', // 测试环境
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/yd-inv': ''
      }
    }),
    createProxyMiddleware('/yd-pur', {
      // target: 'http://192.168.0.210:8090', // 测试环境
      target: 'http://101.132.189.202:30223/yst/ydpur', // 测试环境
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/yd-pur': ''
      }
    }),
    createProxyMiddleware('/yd-sale', {
      //  target: 'http://192.168.1.202:9020', // 测试环境
      target: 'http://101.132.189.202:30223/yst/ydsale',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/yd-sale': ''
      }
    }),
    createProxyMiddleware('/auth', {
      // target: 'http://192.168.0.210:9001', // 测试环境
      target: 'http://101.132.189.202:30223/yst', // 测试环境
      changeOrigin: true,
      secure: false
    })
    // createProxyMiddleware('/oauth', {
    //   // target: 'http://192.168.0.210:9001', // 测试环境
    //   target: 'http://101.132.189.202:30223/yst/oauth', // 测试环境
    //   changeOrigin: true,
    //   secure: false
    // })
  );
};
