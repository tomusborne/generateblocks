import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

export default function Repeat( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Repeat', 'generateblocks' ) }
			value={ value }
			options={ [
				{ label: 'no-repeat', value: 'no-repeat' },
				{ label: 'repeat', value: 'repeat' },
				{ label: 'repeat-x', value: 'repeat-x' },
				{ label: 'repeat-y', value: 'repeat-y' },
			] }
			onChange={ onChange }
		/>
	);
}
