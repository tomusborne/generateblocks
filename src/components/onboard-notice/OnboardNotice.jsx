import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/apiFetch';
import { store as coreStore } from '@wordpress/core-data';

import { NoticePanel } from '@components';
import './editor.scss';

export function OnboardNotice( { title, onboardingKey, children } ) {
	const [ showOnboard, setShowOnboard ] = useState( false );
	const user = useSelect( ( select ) => select( coreStore )?.getCurrentUser(), [] );

	useEffect( function() {
		if (
			sessionStorage.getItem( `generateblocks_onboarding_${ onboardingKey }` ) !== '1' &&
			! user?.meta?.generateblocks_onboarding[ onboardingKey ]
		) {
			setShowOnboard( true );
		}
	}, [ user?.id, JSON.stringify( user?.meta ), onboardingKey ] );

	if ( ! showOnboard ) {
		return null;
	}

	return (
		<NoticePanel
			title={ title }
			onDismiss={ () => {
				apiFetch( {
					path: '/generateblocks/v1/onboarding',
					method: 'POST',
					data: {
						key: onboardingKey,
					},
				} ).then( () => {
					setShowOnboard( false );
					sessionStorage.setItem( `generateblocks_onboarding_${ onboardingKey }`, '1' );
				} );
			} }
		>
			{ children }
		</NoticePanel>
	);
}
