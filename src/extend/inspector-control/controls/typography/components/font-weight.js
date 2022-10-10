import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import options from '../options';

// TODO: Remove "default, normal, bold" and set default to 400
export default function FontWeight( { value, onChange } ) {
	return (
		<SelectControl
			labelPosition={ 'top' }
			label={ __( 'Font weight', 'generateblocks' ) }
			value={ value }
			options={ options.fontWeight }
			onChange={ onChange }
		/>
	);
}
