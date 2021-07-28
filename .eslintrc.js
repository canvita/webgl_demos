module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		indent: [0, "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"prefer-template": "error",
		"no-extra-semi": "off",
		"@typescript-eslint/no-extra-semi": ["error"],
	},
};
