module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 12
	},
	"rules": {
		"indent": [
			"warn",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"warn",
			"double"
		],
		"semi": [
			"warn",
			"always"
		]
	}
};
