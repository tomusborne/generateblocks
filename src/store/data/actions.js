import { createAsyncThunk } from '@reduxjs/toolkit';
import apiFetch from '@wordpress/api-fetch';
import { buildQueryString } from '../../utils/build-query-string';

const FETCH_ONE_ACTION = 'generateBlocks/data/fetchOne';
const FETCH_MANY_ACTION = 'generateBlocks/data/fetchMany';

/**
 * Fetch many records of a given kind (eg. posts, pages)
 *
 * @example dispatch( fetchManeRecords( { kind: 'posts', query: { per_page: 5 } } ) );
 */
export const fetchManyRecords = createAsyncThunk(
	FETCH_MANY_ACTION,
	async ( options ) => (
		await fetchFromAPI( options?.kind, undefined, options?.query )
	)
);

/**
 * Fetch one record of a given kind and id
 *
 * @example dispatch( fetchOne( { kind: 'pages', id: 1922, query: {} } ) );
 */
export const fetchOneRecord = createAsyncThunk(
	FETCH_ONE_ACTION,
	async ( options ) => (
		await fetchFromAPI( options?.kind, options?.id, options?.query )
	)
);

/**
 * Fetch resources from the rest api.
 *
 * @param restBase The endpoint to make the request.
 * @param id The id of the resource, not required.
 * @param query The query params.
 * @param restNamespace The endpoint namespace if applicable.
 *
 * @returns {Promise} The request promise.
 */
async function fetchFromAPI( restBase, id = undefined, query = {}, restNamespace = 'wp/v2' ) {
	const restQuery = buildQueryString( query );
	const recordId = !! id ? id : '';

	return await apiFetch( {
		method: 'GET',
		path: `/${restNamespace}/${restBase}/${recordId}?${restQuery}`,
	} );
}

