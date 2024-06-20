const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const { resolve } = require( 'path' );

const defaultEntries = defaultConfig.entry();
const isProduction = process.env.NODE_ENV === 'production';

const config = {
	...defaultConfig,
	entry: {
		...defaultEntries,
		blocks: './src/blocks.js',
		dashboard: './src/dashboard.js',
		'pattern-library': './src/pattern-library.js',
		'editor-sidebar': './src/editor-sidebar.js',
		components: './src/components.scss',
		'block-styles': './src/block-styles.scss',
		editor: './src/editor.js',
	},
	output: {
		...defaultConfig.output,
		path: __dirname + '/dist',
	},
	plugins: [
		...defaultConfig.plugins,
		new RemoveEmptyScriptsPlugin( {
			stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
		} ),
	],
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@utils': resolve( __dirname, 'src/utils' ),
			'@components': resolve( __dirname, 'src/components' ),
			'@hooks': resolve( __dirname, 'src/hooks' ),
			'@hoc': resolve( __dirname, 'src/hoc' ),
		},
		extensions: [ '.js', '.jsx', '.json' ],
		enforceExtension: false,
	},
};

if ( ! isProduction ) {
	config.plugins.push(
		new ESLintPlugin( {
			failOnError: false,
			fix: false,
			lintDirtyModulesOnly: true,
		} ),
	);
}

module.exports = config;
