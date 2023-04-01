const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "production",
	devtool: 'source-map',
	entry: ['./src/main.js', './src/main.css'],
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist-mf'),
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				mainStyles: {
					type: "css/mini-extract",
					name: "main",
					chunks: (chunk) => {
						return chunk.name === "main";
					},
					enforce: true,
				},
			},
		},
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin(),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: true,
			chunks: ['main'],
			filename: 'index.html'
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
};