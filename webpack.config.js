const {
	camelCaseDash,
} = require( '@wordpress/dependency-extraction-webpack-plugin/lib/util' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const { resolve } = require( 'path' );

const defaultEntries = defaultConfig.entry();
const isProduction = process.env.NODE_ENV === 'production';
const { dependencies } = require( './package' );

const EDGE22_NAMESPACE = '@edge22/';

// Get all edge22 packages.
const edge22Packages = Object.keys( dependencies )
	.filter(
		( packageName ) => packageName.startsWith( EDGE22_NAMESPACE )
	)
	.map( ( packageName ) => packageName.replace( EDGE22_NAMESPACE, '' ) );

// Setup entries for each edge22 package.
const packageEntries = Object.fromEntries(
	edge22Packages.map( ( packageName ) => [
		packageName,
		{
			import: require.resolve( `./node_modules/@edge22/${ packageName }/dist/index.js` ),
			library: {
				name: [ 'gb', camelCaseDash( packageName ) ],
				type: 'window',
			},
		},
	] )
);

// Declare any other entries specific to this plugin.
const pluginEntries = {
	blocks: './src/blocks.js',
	dashboard: './src/dashboard.js',
	'pattern-library': './src/pattern-library.js',
	'editor-sidebar': './src/editor-sidebar.js',
	packages: './src/packages.scss',
	editor: './src/editor.js',
	looper: './src/blocks/query/looper.js',
};

const config = {
	...defaultConfig,
	entry: {
		...defaultEntries,
		...pluginEntries,
		...packageEntries,
	},
	output: {
		...defaultConfig.output,
		path: __dirname + '/dist',
	},
	plugins: [
		// ...defaultConfig.plugins,
		...defaultConfig.plugins.filter(
			( plugin ) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
		),
		new DependencyExtractionWebpackPlugin( {
			useDefaults: true,
			requestToExternal( request ) {
				// Only externalize edge22 package imports.
				if ( request.startsWith( '@edge22/' ) && ! request.includes( 'dist' ) ) {
					return [
						'gb',
						camelCaseDash( request.substring( EDGE22_NAMESPACE.length ) ),
					];
				}

				return undefined;
			},
			requestToHandle( request ) {
				if ( request.startsWith( EDGE22_NAMESPACE ) ) {
					return 'generateblocks-' + request.substring( EDGE22_NAMESPACE.length );
				}
			},
		} ),
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
		symlinks: false,
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
