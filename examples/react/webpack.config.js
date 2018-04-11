const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	entry: {
		main: path.resolve(__dirname, 'index.js')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'react',
						[ 'env', {
							targets: {
								browsers: [ 'last 2 versions' ],
							}
						}]
					],
					plugins: [
						['transform-object-rest-spread', { useBuiltIns: true }],
					],
				},
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'index.html'),
			filename: 'index.html',
			chunks: [ 'main' ],
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.SourceMapDevToolPlugin(),
	],
	devServer: {
		compress: true,
		hot: true,
		stats: 'minimal',
	}
}