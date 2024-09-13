const WPDependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const json2php = require( 'json2php' );

class DependencyExtractionWebpackPlugin extends WPDependencyExtractionWebpackPlugin {
	/**
	 * @param {any} asset Asset Data
	 * @return {string} Stringified asset data suitable for output
	 */
	stringify( asset ) {
		const prefix = 'generateblocks-';
		const sortedDeps = asset.dependencies.sort( ( a, b ) => {
			const aMatches = a.startsWith( prefix );
			const bMatches = b.startsWith( prefix );

			if ( aMatches && ! bMatches ) {
				return 1;
			}
			if ( bMatches && ! aMatches ) {
				return -1;
			}

			return a.localeCompare( b );
		} );

		const updatedAsset = { ...asset, dependencies: sortedDeps };

		if ( this.options.outputFormat === 'php' ) {
			return `<?php return ${ json2php(
				JSON.parse( JSON.stringify( updatedAsset ) )
			) };\n`;
		}

		return JSON.stringify( updatedAsset );
	}
}

module.exports = DependencyExtractionWebpackPlugin;
