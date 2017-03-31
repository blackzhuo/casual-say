const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.config');
// entry 中注入调试代码
config.entry.index.unshift("webpack-dev-server/client?http://localhost:8111/", "webpack/hot/only-dev-server");
config.output = {
    path: path.resolve(__dirname, 'public', 'dist'),
    publicPath: '/dist/',
    filename: "[name].js"
};
// 插件中注入调试代码
config.plugins.shift();
config.plugins.concat([
    new ExtractTextPlugin({
        filename: "[name].css"
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
]);
// 创建dev server
module.exports = Object.assign(config, {
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, "public"),
        publicPath: config.output.publicPath,
        port: 8111,
        compress: true,
        clientLogLevel: "info",
        historyApiFallback: true,
        filename: "index.js",
        headers: {
            "X-Powered-By": "X"
        },
        watchContentBase: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        },
        // https: true,
        // https: {
        //   key: fs.readFileSync("/path/to/server.key"),
        //   cert: fs.readFileSync("/path/to/server.crt"),
        //   ca: fs.readFileSync("/path/to/ca.pem"),
        // }
    }
});