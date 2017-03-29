const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
config.entry.index.unshift("webpack-dev-server/client?http://localhost:8111/", "webpack/hot/only-dev-server");
module.exports = Object.assign(config, {
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, "public"),
        publicPath: '/public/dist/',
        port: 8111,
        compress: true,
        clientLogLevel: "info",
        filename: "index.js",
        headers: {
            "X-Powered-By": "X"
        },
        watchContentBase: true,
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
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
});