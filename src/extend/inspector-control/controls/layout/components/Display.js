import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

export default function Display( { value, onChange } ) {
	return (
		<SelectControl
			label={ applyFilters(
				'generateblocks.editor.control.label',
				__( 'Display', 'generateblocks' ),
				value,
				'display',
			) }
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
