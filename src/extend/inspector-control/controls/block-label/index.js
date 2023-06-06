import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function BlockLabel( { value, onChange } ) {
	return (
		<TextControl
			label={ __( 'Block label', 'generateblocks' ) }
			help={ __( 'Add a label for this block in the List View.', 'generateblocks' ) }
			value={ value }
			onChange={ onChange }
		/>
	);
}
