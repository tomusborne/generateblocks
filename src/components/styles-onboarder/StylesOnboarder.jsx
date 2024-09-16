import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Button } from '@wordpress/components';

import { OpenPanel } from '@edge22/components';

export function StylesOnboarder() {
	const screenshot = generateBlocksEditor.stylesButtonScreenshot;
	const [ showOnboard, setShowOnboard ] = useState( false );
	const user = useSelect( ( select ) => select( coreStore )?.getCurrentUser(), [] );

	useEffect( function() {
		if (
			sessionStorage.getItem( `generateblocks_onboarding_styles_tab` ) !== '1' &&
			! user?.meta?.generateblocks_onboarding.styles_tab
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
			title={ __( 'Styles', 'generateblocks' ) }
			panelId="styles-onboarder"
		>
			<p style={ { marginBottom: '0' } }>{ __( 'Block styles can be found by clicking on the Styles icon above.', 'generateblocks' ) }</p>
			<img
				src={ screenshot }
				alt={ __( 'Styles Tab', 'generateblocks' ) }
				style={ style }
			/>

			<div style={ { display: 'flex', gap: '5px' } }>
				<Button
					variant="primary"
					onClick={ () => {
						apiFetch( {
							path: '/generateblocks/v1/onboarding',
							method: 'POST',
							data: {
								key: 'styles_tab',
							},
						} ).then( () => {
							setShowOnboard( false );
							sessionStorage.setItem( 'generateblocks_onboarding_styles_tab', '1' );
						} );
					} }
				>
					{ __( 'Got it', 'generateblocks' ) }
				</Button>
			</div>
		</OpenPanel>
	);
}
