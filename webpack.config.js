const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		index: ['./index/index.es6']
	},
	output: {
		filename: '[name].js',
		publicPath: '/public/dist/',
		path: path.resolve(__dirname, 'public', 'dist')
	},
	context: path.resolve(__dirname, 'public/libs'),
	module: {
		rules: [
			{
				test: /\.es6$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.es6$/,
				exclude: /(node_modules)/,
				loader: 'eslint-loader',
				options: {
					configFile: './.eslintrc',
					failOnWarning: true,
					failOnError: true
				}
			}
		]
	},
	plugins: [
	]
}