import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

export default function UseInlineStyle( { disabled, checked, onChange } ) {
	return (
		<ToggleControl
			label={ __( 'Use inline style', 'generateblocks' ) }
			disabled={ disabled }
			checked={ checked }
			onChange={ onChange }
		/>
	);
}
