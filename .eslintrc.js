module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime'
	],
	parser: "@babel/eslint-parser",
	rules: {
		'no-console': 'off', // enable using console in dev mode but got err in production
		'no-debugger': 'off', // enable using debugger in dev mode but got err in production
		"react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
	},
	plugins: [
		"react-hooks",
	],
};
