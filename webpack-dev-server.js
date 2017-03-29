const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
let config = require('./webpack.config');
config.entry.index.unshift("webpack-dev-server/client?http://localhost:8111/", "webpack/hot/only-dev-server");
config = Object.assign({}, config, {
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
});
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: path.join(__dirname, "public"),
    publicPath: '/public/dist/',
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
});
server.listen(8111, "localhost", () => {
    console.log('listen port at 8111.');
});
// server.close();