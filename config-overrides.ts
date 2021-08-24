const {
  override,
  addLessLoader,
  addWebpackAlias,
  fixBabelImports,
  addWebpackPlugin,
  adjustStyleLoaders,
  overrideDevServer,
  addBabelPlugins,
  setWebpackPublicPath,
  addBundleVisualizer
} = require('customize-cra');
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
// // proxy设置
// const addProxy = () => (configFunction) => {
//   configFunction.proxy = {
//     "/yst-fc": {
//       target: "http://49.4.1.253/yst-yh",
//       changeOrigin: true,
//       // pathRewrite: { '': '' },
//     },
//   };
//   return configFunction;
// };

const myPlugin = [
  new UglifyJsPlugin({
    uglifyOptions: {
      warnings: false,
      compress: {
        drop_debugger: true,
        drop_console: true
      }
    }
  }),
  new CompressionWebpackPlugin({
    test: /\.js$|\.css$|\.ts$/,
    threshold: 10240
  })
];
module.exports = {
  webpack: override(
    // 引入less
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#ec6303' }
      }
    }),
    // 按需加载
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true //或者css, true代表运用less
    }),

    // alias
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      config: path.resolve(__dirname, 'config')
    }),
    process.env.NODE_ENV !== 'development' && addBundleVisualizer(), // 可视化包体积分析
    setWebpackPublicPath(
      process.env.NODE_ENV !== 'development'
        ? process.env.REACT_APP_BASE_URL
        : ''
    ), // 打包静态目录配置
    addBabelPlugins(['react-hot-loader/babel']),
    (config) => {
      if (process.env.NODE_ENV === 'production') {
        config.devtool = false;
      }

      //暴露webpack的配置 config ,env
      // 去掉打包生产map 文件
      config.devtool = config.mode === 'development' ? 'source-map' : false;
      // if (process.env.NODE_ENV === "production") config.devtool = false;
      if (process.env.NODE_ENV !== 'development')
        config.plugins = [...config.plugins, ...myPlugin];
      config.module.rules[1].oneOf.push({
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true
            }
          }
        ]
      });
      return config;
    }
  )
};
