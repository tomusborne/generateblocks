import { Notice, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function BackgroundColorOverlay( { checked, onChange } ) {
	return (
		<>
			<ToggleControl
				label={ __( 'Background Color Overlay', 'generateblocks' ) }
				checked={ checked }
				onChange={ onChange }
			/>

			<Notice
				className="gblocks-option-notice"
				status="info"
				isDismissible={ false }
			>
				{ __( 'The background color overlay option is deprecated. Toggle this option to use the new method.', 'generateblocks' ) }
			</Notice>
		</>
	);
}
