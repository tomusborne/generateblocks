export function removeEmpty( obj ) {
	return Object.fromEntries( Object.entries( obj ).filter( ( [ idx, value ] ) => {
		return Array.isArray( value ) ? !! value.length : !! value;
	} ) );
}

function getTaxQueryParam( taxQuery, isExclude = false ) {
	const paramKey = isExclude ? `${taxQuery.rest}_exclude` : taxQuery.rest;
	return { [ paramKey ]: taxQuery.terms };
}

function normalizeTaxQuery( taxQueryValue, isExclude = false ) {
	return taxQueryValue.reduce( ( normalized, taxQuery ) => {
		return Object.assign( {}, normalized, getTaxQueryParam( taxQuery, isExclude ) );
	}, {} );
}

export function normalizeRepeatableArgs( query ) {
	let normalizedQuery = Object.assign( {}, query );

	if ( Array.isArray( query[ 'tax_query' ] ) ) {
		const normalizedTaxQuery = normalizeTaxQuery( query[ 'tax_query' ] );

		normalizedQuery = Object.assign(
			{},
			normalizedQuery,
			normalizedTaxQuery,
			{ ['tax_query']: undefined }
		);
	}

	if ( Array.isArray( query[ 'tax_query_exclude' ] ) ) {
		const normalizedTaxQueryExclude = normalizeTaxQuery( query[ 'tax_query_exclude' ], true );

		normalizedQuery = Object.assign(
			{},
			normalizedQuery,
			normalizedTaxQueryExclude,
			{ ['tax_query_exclude']: undefined }
		);
	}

	return normalizedQuery;
}
