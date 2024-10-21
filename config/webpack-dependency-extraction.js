const WPDependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

class DependencyExtractionWebpackPlugin extends WPDependencyExtractionWebpackPlugin {
	/**
	 * Extend the default stringify behavior to sort dependencies by name before returning them.
	 *
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

		// Fallback to the original method with the updated asset.
		return super.stringify( updatedAsset );
	}
}

module.exports = DependencyExtractionWebpackPlugin;
