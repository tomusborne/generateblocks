import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

export default function Size( { value, onChange } ) {
	return (
		<TextControl
			label={ __( 'Size', 'generateblocks' ) }
			value={ value }
			onChange={ onChange }
		/>
	);
}
