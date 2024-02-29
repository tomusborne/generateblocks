import { useState, useEffect } from '@wordpress/element';
import { useLibrary } from './library-provider';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { isEmpty } from 'lodash';
import { Button, Icon, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { backup } from '@wordpress/icons';

export default function LibraryCache( { setCacheIsClearing, cacheIsClearing } ) {
	const { activeLibrary, setLibraryCategories, setLibraryPatterns, isLocal } = useLibrary();
	const [ cacheData, setCacheData ] = useState( false );

	async function checkCacheData() {
		if ( isLocal ) {
			setCacheData( {} );
			return;
		}

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
			if ( ! activeLibrary?.id ) {
				return;
			}

			checkCacheData();
		}() );
	}, [ activeLibrary?.id ] );

	if ( isEmpty( cacheData ) ) {
		return null;
	}

	return (
		<Button
			className="has-icon"
			variant="tertiary"
			size="compact"
			disabled={ ! cacheData.can_clear || cacheIsClearing }
			label={ __( 'Refresh patterns', 'generateblocks' ) }
			showTooltip
			onClick={ async() => {
				setCacheIsClearing( true );
				const response = await apiFetch( {
					path: '/generateblocks/v1/pattern-library/clear-cache',
					data: {
						id: activeLibrary?.id,
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
		>
			{ !! cacheIsClearing ? <Spinner /> : <Icon icon={ backup } /> }
		</Button>
	);
}
