import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

export default function Position( { value, onChange } ) {
	return (
		<TextControl
			label={ __( 'Position', 'generateblocks' ) }
			value={ value }
			onChange={ onChange }
		/>
	);
}
