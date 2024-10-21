import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { styles } from '@wordpress/icons';

import { OnboardNotice } from '..';

function Icon() {
	return (
		<span className="gb-inline-icon">{ styles }</span>
	);
}

export function StylesOnboarder() {
	return (
		<OnboardNotice
			title={ __( 'Styles', 'generateblocks' ) }
			onboardingKey={ 'styles_panel' }
		>
			<p>{ createInterpolateElement(
				__( 'Block styles can be found by clicking on the <Styles /> icon.', 'generateblocks' ),
				{
					Styles: <Icon />,
				}
			) }</p>
		</OnboardNotice>
	);
}
