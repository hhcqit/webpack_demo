const path = require('path');
const webpack = require('webpack');//访问内置插件
const uglifyPlugin = require('uglifyjs-webpack-plugin');//不需要安装用来压缩文件的
const htmlPlugin = require("html-webpack-plugin");//需要通过npm安装
module.exports = {
    entry: {//入口
        entry: "./src/entry.js"
    },
    output: {//出口
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"//[name]表示打包出来的文件和入口名称相同
    },
    module: {
        rules: [
            {
                test: /\.css$/,//正则找到css文件
                // use:['style-loader','css-loader'],//使用文件
                // loader:['style-loader','css-loader'],//使用文件
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    }
                ],
                // query: //额外的配置项
            },
            {
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500000 //图片小于limit时打成base64位
                    }
                }]
            }
        ]//规则
    },
    plugins: [
        // new uglifyPlugin(),//压缩生成的代码文件，需要先引入uglify变量 在开发情况下是无法压缩的，需要先注释掉，webpack打包时再改过来
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true//去掉引号如<div id="a1"></div>会变成<div id=a1><div>
            },
            hash:true,//去掉缓存
            template:'./src/index.html'
        })
    ],//插件
    devServer: {//开发服务
        contentBase: path.resolve(__dirname, 'dist'),//默认webpack dev server是从项目的根目录提供服务
        host: '192.168.0.119',//服务器地址在cmd里通过ipconfig命令可以查看本机地址
        compress: true,//服务器压缩
        port: 8080//生产环境一般默认接口为80端口，这里开发时可以随意设置
    }
}