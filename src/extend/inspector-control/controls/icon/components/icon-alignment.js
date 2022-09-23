import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import iconOptions from '../options';

export default function IconAlignment( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Icon Alignment', 'generateblocks' ) }
			value={ value }
			options={ iconOptions.alignment }
			onChange={ onChange }
		/>
	);
}
