import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export function usePostRecord( { postId, load = [], options = {} } ) {
	const [ record, setRecord ] = useState( null );
	const [ isLoading, setIsLoading ] = useState( true );

	useEffect( () => {
		if ( ! postId || ! load.length ) {
			return;
		}
		async function fetchPostRecord() {
			setIsLoading( true );

			try {
				const response = await apiFetch( {
					path: `/generateblocks/v1/post-record?postId=${ postId }&load=${ load.join() }&options=${ JSON.stringify( options ) }`,
				} );
				setRecord( response );
			} catch ( error ) {
				console.error( 'Error fetching post record:', error ); // eslint-disable-line no-console
			} finally {
				setIsLoading( false );
			}
		}

		fetchPostRecord();
	}, [ postId, load, options ] );

	return { record, isLoading };
}
