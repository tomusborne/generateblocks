import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Button } from '@wordpress/components';

import { OpenPanel } from '@edge22/components';

export function DynamicTagsOnboarder( { screenshot } ) {
	const [ showOnboard, setShowOnboard ] = useState( false );
	const user = useSelect( ( select ) => select( coreStore )?.getCurrentUser(), [] );

	useEffect( function() {
		if (
			sessionStorage.getItem( `generateblocks_onboarding_dynamic_content` ) !== '1' &&
			! user?.meta?.generateblocks_onboarding.dynamic_content
		) {
			setShowOnboard( true );
		}
	}, [ user?.id, JSON.stringify( user?.meta ) ] );

	if ( ! screenshot || ! showOnboard ) {
		return null;
	}

	const style = {
		border: '1px solid #222',
		borderRadius: '2px',
	};

	return (
		<OpenPanel
			title={ __( 'Dynamic Data', 'generateblocks' ) }
			panelId="dynamic-content"
		>
			<p style={ { marginBottom: '0' } }>{ __( 'Dynamic data options can be found by clicking on the dynamic tags icon in your block toolbar and/or block settings.', 'generateblocks' ) }</p>
			<img
				src={ screenshot }
				alt={ __( 'Dynamic Data', 'generateblocks' ) }
				style={ style }
			/>

			<Button
				variant="primary"
				onClick={ () => {
					apiFetch( {
						path: '/generateblocks/v1/onboarding',
						method: 'POST',
						data: {
							key: 'dynamic_content',
						},
					} ).then( () => {
						setShowOnboard( false );
						sessionStorage.setItem( 'generateblocks_onboarding_dynamic_content', '1' );
					} );
				} }
			>
				{ __( 'Got it', 'generateblocks' ) }
			</Button>
		</OpenPanel>
	);
}
