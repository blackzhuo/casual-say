const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({
    update: true,
    filename: 'assets.json',
    path: path.join(__dirname, 'hash'),
    processOutput: function(assets) {
        for(let i in assets){
            for(let j in assets[i]){
                assets[i][j] = `http://127.0.0.1:8111${assets[i][j]}?_=${+new Date()}`;
            }
        }
        return JSON.stringify(assets)
    }
});

let config = require('./webpack.config');
config.entry.index.unshift("webpack-dev-server/client?http://localhost:8111/", "webpack/hot/only-dev-server");
config.output = {
    path: path.resolve(__dirname, 'public', 'dist'),
    publicPath: '/dist/',
    filename: "[name].js"
};
// 插件中注入调试代码
config.plugins.length = 0;
config.plugins = config.plugins.concat([
    new ExtractTextPlugin({
        filename: "[name].css"
    }),
    assetsPluginInstance,
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
    watchContentBase: true,
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