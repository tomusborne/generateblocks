import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import iconOptions from '../options';

export default function IconLocation( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Icon Location', 'generateblocks' ) }
			value={ value }
			options={ iconOptions.location }
			onChange={ onChange }
		/>
	);
}
