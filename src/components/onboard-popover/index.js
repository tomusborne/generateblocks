import { memo, useEffect, useState } from '@wordpress/element';
import { Button, Popover } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './styles.scss';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const OnboardPopover = memo( function OnboardPopover( { onboardingKey, children } ) {
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

	return (
		<>
			{ showOnboard &&
				<Popover
					position="bottom right"
					className="gb-onboard-popover"
					focusOnMount={ true }
					noArrow={ false }
					variant="toolbar"
					offset={ 10 }
					flip={ true }
				>
					{ children }
					<div className="gb-onboard-popover__button">
						<Button
							variant="primary"
							onClick={ () => {
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
							{ __( 'Got it', 'generateblocks' ) }
						</Button>
					</div>
				</Popover>
			}
		</>
	);
} );

export default OnboardPopover;
