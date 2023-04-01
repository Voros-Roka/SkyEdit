const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;

module.exports = {
	mode: "production",
	devtool: 'source-map',
	entry: {
		main: ['./src/main.js', './src/main.css'],
	},
	output: {
		path: path.resolve(__dirname, 'dist-sf'),
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
			template: './src/template.html',
			inject: true,
			chunks: ['main'],
			filename: 'index.html',
			inlineSource: '.(js|css)$'
		}),
		new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/]),
		new HTMLInlineCSSWebpackPlugin(),

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