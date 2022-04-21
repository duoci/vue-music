module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // 公共路径
  indexPath: 'index.html',
  // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || 'dist',
  // 'dist', 生产环境构建文件的目录
  assetsDir: 'static',
  // 相对于outputDir的静态资源(js、css、img、fonts)目录
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
