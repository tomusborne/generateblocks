import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

export default function Display( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Display', 'generateblocks' ) }
			value={ value }
			options={ [
				{ label: __( 'Default', 'generateblocks' ), value: '' },
				{ label: 'Block', value: 'block' },
				{ label: 'Inline Block', value: 'inline-block' },
				{ label: 'Flex', value: 'flex' },
				{ label: 'Inline Flex', value: 'inline-flex' },
				{ label: 'Inline', value: 'inline' },
			] }
			onChange={ onChange }
		/>
	);
}
