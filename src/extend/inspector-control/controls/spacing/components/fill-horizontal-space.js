import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

export default function FillHorizontalSpace( { checked, onChange } ) {
	return (
		<ToggleControl
			label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
			checked={ checked }
			onChange={ onChange }
		/>
	);
}
