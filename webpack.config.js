const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );

const isProduction = process.env.NODE_ENV === 'production';

const config = {
	...defaultConfig,
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
