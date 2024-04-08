import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function BlockLabel( { value, onChange } ) {
	// WordPress now has a `blockName` option that handles this.
	if ( ! value ) {
		return null;
	}

	return (
		<TextControl
			label={ __( 'Block label', 'generateblocks' ) }
			help={ __( 'Add a label for this block in the List View.', 'generateblocks' ) }
			value={ value }
			onChange={ onChange }
		/>
	);
}
