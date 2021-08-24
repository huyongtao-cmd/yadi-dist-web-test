const config = {
  local: true, //是否为本地开发
  theme: {
    'primary-color': '#3F51B5',
  },
  cookieServer: '',
  clientId: 'localhost', // 必须填入响应的客户端（本地开发）
  //   server: 'http://api.choerodon.example.com',
  //   fileServer: 'http://minio.choerodon.example.com',
  // webSocketServer: 'ws://notify.choerodon.example.com',
  server: 'http://api.staging.saas.hand-china.com',
  fileServer: 'http://minio.staging.saas.hand-china.com',
  webSocketServer: 'ws://notify.staging.saas.hand-china.com',
  buildType: 'single',
  projectType: 'choerodon',
  master: '@buildrun/apps-master',
  modules: [
    // '@buildrun/base-pro',
    // '@buildrun/devops',
    // '@buildrun/testmanager',
    // '@buildrun/agile',
    // '@buildrun/buzz',
    // '@buildrun/knowledge',
    // '@buildrun/asgard',
    // '@buildrun/notify',
    // '@buildrun/manager',
    // '@buildrun/market',
  ],
  // webpackConfig(config) {
  //   config.resolve.alias = {
  //     '@choerodon/boot': require.resolve('@buildrun/boot'),
  //   };
  //   return config;
  // },
  resourcesLevel: ['site', 'organization', 'project', 'user'],
  titlename: ' ',
};

module.exports = config;
