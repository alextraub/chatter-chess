const path = require("path");

const config = {
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
	entry: "./frontend/src/index.js",
	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				use: {
					loader: 'file-loader'
				}
			},
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: function() {
									return [
										require('precss'),
										require('autoprefixer')
									];
								}
							}
						}
					}
				]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	output: {
		path: path.resolve(__dirname, "frontend/static")
	}
};

module.exports = config;
