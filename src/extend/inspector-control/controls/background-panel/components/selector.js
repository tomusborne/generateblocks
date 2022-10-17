import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

export default function Selector( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Selector', 'generateblocks' ) }
			value={ value }
			options={ [
				{ label: __( 'Element', 'generateblocks' ), value: 'element' },
				{ label: __( 'Pseudo Element', 'generateblocks' ), value: 'pseudo-element' },
			] }
			onChange={ onChange }
		/>
	);
}
