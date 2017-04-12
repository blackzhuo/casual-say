const fs = require("fs");
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({
    update: true,
    filename: 'assets.json',
    path: path.join(__dirname, 'hash'),
    processOutput: function(assets) {
        return JSON.stringify(assets)
    }
});
module.exports = {
    // 定义资源入口文件
    entry: {
        index: ['./index/index.es6'],
        notfound: ['./notfound/index.es6']
    },
    // 定义资源打包文件
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        publicPath: '/dist/',
        filename: "[name].[chunkhash].bundle.js",
        chunkFilename: "[id].[chunkhash].bundle.js"
    },
    // 设置资源基本路径
    context: path.resolve(__dirname, 'public/libs'),
    // resolve: {
    //     extensions: ['js', 'jsx', 'es6']
    // },
    module: {
        rules: [{
            // css scss loader
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }, {
            // js文件 babel-loader 转换es6 react
            test: /\.es6$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'react-hot-loader',
                options: {}
            }, {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3'],
                    plugins: ['transform-object-rest-spread', 'transform-decorators-legacy']
                }
            }]
        }, {
            // eslint loader 配置文件 .eslintrc
            test: /\.es6$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'eslint-loader',
                options: {
                    configFile: './.eslintrc',
                    failOnWarning: true,
                    failOnError: true
                }
            }
        }, {
            // image loader
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false']
        }]
    },
    plugins: [
        // css内容contenthash值
        new ExtractTextPlugin({
            filename: "[name].[contenthash].bundle.css"
        }),
        // 自定义插件，生成hash文件
        function() {
            this.plugin("done", function(stats) {
                fs.writeFileSync(path.join(__dirname, "hash", "hash.json"), JSON.stringify(stats.toJson()));
            });
        },
        // 生成 js css 的hash文件
        assetsPluginInstance,
        // js内容chunkhash值，只受js内容影响
        new WebpackMd5Hash()
    ]
}