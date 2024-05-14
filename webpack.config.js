const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const defaultEntries = defaultConfig.entry();

module.exports = {
	...defaultConfig,
	entry: {
		...defaultEntries,
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
