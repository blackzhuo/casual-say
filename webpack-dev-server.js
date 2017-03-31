const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let config = require('./webpack.config');
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
config = Object.assign({}, config, {
    devtool: 'inline-source-map'
});
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: path.join(__dirname, "public"),
    publicPath: config.output.publicPath,
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
});
server.listen(8111, "localhost", () => {
    console.log('listen port at 8111.');
});
// server.close();