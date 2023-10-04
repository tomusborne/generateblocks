import { useState, useEffect } from '@wordpress/element';
import { useLibrary } from './library-provider';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { isEmpty } from 'lodash';
import { Button, Spinner } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

export default function LibraryCache() {
	const { activeLibrary, setLibraryCategories, setLibraryPatterns } = useLibrary();
	const [ cacheData, setCacheData ] = useState( false );
	const [ cacheIsClearing, setCacheIsClearing ] = useState( false );

	async function checkCacheData() {
		const cacheDataResponse = await apiFetch( {
			path: addQueryArgs( `/generateblocks/v1/pattern-library/get-cache-data`, {
				id: activeLibrary.id,
			} ),
			method: 'GET',
		} );

		if ( cacheDataResponse.success ) {
			setCacheData( cacheDataResponse?.response?.data ?? {} );
		} else {
			setCacheData( {} );
		}
	}

	useEffect( () => {
		( async function() {
			if ( ! activeLibrary.id ) {
				return;
			}

			checkCacheData();
		}() );
	}, [ activeLibrary.id ] );

	if ( isEmpty( cacheData ) ) {
		return null;
	}

	return (
		<div className="gblocks-pattern-cache">
			{ !! cacheData.can_clear &&
				<Button
					variant="secondary"
					size="compact"
					onClick={ async() => {
						setCacheIsClearing( true );
						const response = await apiFetch( {
							path: '/generateblocks/v1/pattern-library/clear-cache',
							data: {
								id: activeLibrary.id,
							},
							method: 'POST',
						} );

						if ( response.success ) {
							await setLibraryCategories();
							await setLibraryPatterns();
							await checkCacheData();
						}

						setCacheIsClearing( false );
					} }
					disabled={ ! cacheData.can_clear }
				>
					{ !! cacheIsClearing ? <Spinner /> : __( 'Clear cache', 'generateblocks' ) }
				</Button>
			}

			<div className="gblocks-pattern-cache__info">
				{ sprintf(
					// Translators: Cache expiry date.
					__( 'Cache expires: %s', 'generateblocks' ),
					cacheData.expiry_time
				) }
			</div>
		</div>
	);
}
