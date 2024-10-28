import { TextControl } from '@wordpress/components';

export function IdAttributeControl( { value, onChange } ) {
	return (
		<TextControl
			label="HTML ID"
			value={ value }
			onChange={ onChange }
		/>
	);
}
