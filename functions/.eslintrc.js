module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['tsconfig.json'],
		sourceType: 'module',
	},
	ignorePatterns: [
		'/lib/**/*', // Ignore built files.
	],
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		'quotes': ['error', 'single'],
		'object-curly-spacing': ['error', 'always'],
		'max-len': ['error', { 'code': 120 }],
		'@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
	},
};
