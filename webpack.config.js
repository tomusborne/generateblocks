const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		blocks: './src/blocks.js',
		dashboard: './src/dashboard.js',
		'pattern-library': './src/pattern-library.js',
		'editor-sidebar': './src/editor-sidebar.js',
	},
	output: {
		...defaultConfig.output,
		path: __dirname + '/dist',
	},
};
