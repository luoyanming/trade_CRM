module.exports = {
    publicPath: '',
    outputDir: 'dist',  //打包路径
    assetsDir: 'static',  //静态资源存放路径，相对于outputDir

    lintOnSave: false,  //开发环境开启eslint检查

    runtimeCompiler: undefined,  //allow you to use the `template` option in Vue components, 开启的话打包之后额外增加10kb

    productionSourceMap: true,  //资源映射

    integrity: false,  //子资源完整性 (SRI) 安全功能

    parallel: undefined,

    css: {
        modules: false,
        sourceMap: false,

        loaderOptions: {
            sass: {
                sourceMap: false
            },
            css: {
                sourceMap: false
            }
        }
    },

    devServer: {
        port: 8889,
        disableHostCheck: true  //跳过webpack-dev-server的hostname安全验证
    }
}
