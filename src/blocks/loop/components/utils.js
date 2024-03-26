import { applyFilters } from '@wordpress/hooks';

export function removeEmpty( obj ) {
	return Object.fromEntries( Object.entries( obj ).filter( ( [ idx, value ] ) => {
		// Allow the image alt attribute to be empty.
		if ( 'alt' === idx ) {
			return true;
		}

		return Array.isArray( value ) ? !! value.length : !! value;
	} ) );
}

function getTaxQueryParam( taxQuery, isExclude = false ) {
	const paramKey = isExclude ? `${ taxQuery.rest }_exclude` : taxQuery.rest;
	return { [ paramKey ]: {
		terms: taxQuery.terms,
		include_children: taxQuery?.includeChildren,
	} };
}

function normalizeTaxQuery( taxQueryValue, isExclude = false ) {
	return taxQueryValue.reduce( ( normalized, taxQuery ) => {
		return Object.assign( {}, normalized, getTaxQueryParam( taxQuery, isExclude ) );
	}, {} );
}

export function normalizeRepeatableArgs( query ) {
	let normalizedQuery = normalizeArgs( query );

	if ( Array.isArray( normalizedQuery.tax_query ) ) {
		const normalizedTaxQuery = normalizeTaxQuery( normalizedQuery.tax_query );

		normalizedQuery = Object.assign(
			{},
			normalizedQuery,
			normalizedTaxQuery,
			{ tax_query: undefined }
		);
	}

	if ( Array.isArray( normalizedQuery.tax_query_exclude ) ) {
		const normalizedTaxQueryExclude = normalizeTaxQuery( normalizedQuery.tax_query_exclude, true );

		normalizedQuery = Object.assign(
			{},
			normalizedQuery,
			normalizedTaxQueryExclude,
			{ tax_query_exclude: undefined }
		);
	}

	return normalizedQuery;
}

export function normalizeArgs( query ) {
	const defaultPerPage = !! query.per_page ? query.per_page : 10;

	// In the editor we capped the posts.
	const perPage = '-1' === query.per_page || parseInt( query.per_page ) > parseInt( generateBlocksInfo.queryLoopEditorPostsCap )
		? generateBlocksInfo.queryLoopEditorPostsCap
		: defaultPerPage;

	let sticky;

	if ( 'exclude' === query.stickyPosts ) {
		sticky = false;
	} else if ( 'only' === query.stickyPosts ) {
		sticky = true;
	}

	const normalizedQuery = Object.assign( {}, query, { per_page: perPage, sticky } );

	return applyFilters( 'generateblocks.editor.query-loop.normalize-parameters', normalizedQuery );
}
