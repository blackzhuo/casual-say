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
    entry: {
        index: ['./index/index.es6']
    },
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        publicPath: '/dist/',
        filename: "[name].[chunkhash].bundle.js",
        chunkFilename: "[id].[chunkhash].bundle.js"
    },
    context: path.resolve(__dirname, 'public/libs'),
    module: {
        rules: [{
            test: /\.es6$/,
            exclude: /(node_modules)/,
            use: {
                loader: ['babel-loader', 'react-hot-loader'],
                options: {
                    presets: ['env'],
                    plugins: [require('babel-plugin-transform-object-rest-spread')]
                }
            }
        }, {
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
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false']
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].[contenthash].bundle.css"
        }),
        function() {
            this.plugin("done", function(stats) {
                fs.writeFileSync(path.join(__dirname, "hash", "hash.json"), JSON.stringify(stats.toJson()));
            });
        },
        assetsPluginInstance,
        new WebpackMd5Hash()
    ]
}