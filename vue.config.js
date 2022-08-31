module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
        // target: 'https://ttt.ebanktest.com.cn:39007/app',
        target: 'http://188.155.32.103:9100',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  publicPath: './',
  // 输出文件目录   文件夹名
  outputDir: 'dist/www',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。    资源放的目录
  assetsDir: "./static",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径    index的路劲和名字
  indexPath: './index.html',

  // 打包时不生成.map文件
  productionSourceMap: false
}
