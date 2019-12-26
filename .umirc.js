import {resolve} from 'path';

// const path = require('path');
// ref: https://umijs.org/config/
// https://blog.csdn.net/SCU_Cindy/article/details/82914547 路由配置

export default {
  history: 'hash',

  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {path: '/', component: 'index'},
        {path: '/home', component: './home/components/'},
      ],
    },
  ],


  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,
      },
      // dynamicImport: true, // 按需加载
      dynamicImport: false, // 按需加载
      title: '组件测试',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
      // 添加全局css
      links: [
        // { rel: 'stylesheet', href: "http://at.alicdn.com/t/font_1092043_zapf4yqi50q.css" },
        // { rel: 'stylesheet', href: "http://at.alicdn.com/t/font_1092043_zapf4yqi50q.css" },
        // { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" },
      ],
    }],
    // ['./baidu-map-plugin.js'],

  ],


  alias: {
    components: resolve(__dirname, 'src/components/'),
    node_modules: resolve(__dirname, 'src/node_modules/'),
    utils: resolve(__dirname, 'src/utils'),
    assets: resolve(__dirname, 'src/assets'),
    pages: resolve(__dirname, 'src/pages'),
  },


  proxy: {
    '/admin': {
      target: 'http://127.0.0.1:8080',
      // target: 'http://192.168.43.30:8888/',
      // target: 'http://192.144.173.229:27000/',
      changeOrigin: true,
      // pathRewrite: { "^/api" : ""}
    },
    '/dologin': {
      target: 'http://127.0.0.1:8080',
      // target: 'http://192.168.43.30:8888/',
      // target: 'http://192.144.173.229:27000/',
      changeOrigin: true,
      // pathRewrite: { "^/api" : ""}
    },
    '/logout': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },

    '/login': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
    '/resources': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
    '/needCode': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
    '/work': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },

  },
};
