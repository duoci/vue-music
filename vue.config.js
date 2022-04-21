module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        plugins: '@/plugins',
      },
    },
  },
  devServer: {
    host: '127.0.0.1',
    proxy: {
      '/api': {
        // target: 'https://www.codeman.store',
        target: 'http://www.codeman.ink:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
        headers: {
          'Access-Control-Origin': '*',
        },
        hotOnly: false,
        disableHostCheck: true,
      },
    },
  },
};
