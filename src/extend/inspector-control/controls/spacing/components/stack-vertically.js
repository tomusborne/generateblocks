import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

export default function StackVertically( { checked, onChange } ) {
	return (
		<ToggleControl
			label={ __( 'Stack Vertically', 'generateblocks' ) }
			checked={ checked }
			onChange={ onChange }
		/>
	);
}
