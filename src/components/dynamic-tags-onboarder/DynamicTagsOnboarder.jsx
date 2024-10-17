import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';

import { OnboardNotice } from '..';
import getIcon from '@utils/get-icon';

function Icon() {
	return (
		<span className="gb-inline-icon">{ getIcon( 'database' ) }</span>
	);
}

export function DynamicTagsOnboarder() {
	return (
		<OnboardNotice
			title={ __( 'Dynamic Data', 'generateblocks' ) }
			onboardingKey={ 'dynamic_tags_panel' }
		>
			<p>{ createInterpolateElement(
				__( 'Dynamic data can be found by clicking on the <DynamicTags /> icon in your block toolbar and/or block settings.', 'generateblocks' ),
				{
					DynamicTags: <Icon />,
				}
			) }</p>
		</OnboardNotice>
	);
}
