const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = function override(config, env) {
	config.resolve.alias["@"] = path.resolve(__dirname, "./src");
	// if (config.mode === "production") {
	// 	config.plugins.push(new BundleAnalyzerPlugin());
	// }

	const oneOf_loc = config.module.rules.findIndex((n) => n.oneOf);
	config.module.rules[oneOf_loc].oneOf = [
		//例如要增加处理less的配置
		{
			test: /\.glsl$/,
			loader: "webpack-glsl-loader",
		},
		...config.module.rules[oneOf_loc].oneOf,
	];

	return config;
};
