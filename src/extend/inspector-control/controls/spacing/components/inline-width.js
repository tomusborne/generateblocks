import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

export default function InlineWidth( { checked, onChange } ) {
	return (
		<ToggleControl
			label={ __( 'Inline Width', 'generateblocks' ) }
			checked={ checked }
			onChange={ onChange }
		/>
	);
}
