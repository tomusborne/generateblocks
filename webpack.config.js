const { resolve } = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );

const isProduction = process.env.NODE_ENV === 'production';

const config = {
	...defaultConfig,
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
