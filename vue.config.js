module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {//module同目录加上此配置，打包的时候忽略这些
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'echarts' : 'echarts'
    }
  },
  productionSourceMap: false
}
