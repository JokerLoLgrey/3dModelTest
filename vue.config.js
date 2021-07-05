const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'vconsole': 'VConsole',
  'mobile-detect': 'MobileDetect',
  'vant': 'vant'
}

const cdn = {
  css: [
    'https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css',
    'https://cdn.jsdelivr.net/npm/vant@2.12.21/lib/index.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.5.2/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/vconsole@3.8.1/dist/vconsole.min.js',
    'https://cdn.jsdelivr.net/npm/mobile-detect@1.4.5/mobile-detect.min.js',
    'https://cdn.jsdelivr.net/npm/vant@2.12.21/lib/vant.min.js'
  ]
}

module.exports = {
  productionSourceMap: false,
  devServer: {
    // https: true,
    host:'0.0.0.0',
    /* 使用代理 */
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://192.168.0.109:6020',
        /* 允许跨域 */
        changeOrigin: true,
        pathRewrite: {
          '^/api':  ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      // if (process.env.NODE_ENV === 'production') {
      //   args[0].cdn = cdn
      // }
      args[0].cdn = cdn
      return args
    })
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
  },
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   return {
    //     externals: externals
    //   }
    // }
    return {
      externals: externals
    }
  },
  assetsDir: 'assets',
  publicPath: '/rex-sq/'
}
