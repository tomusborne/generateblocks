import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import spacingOptions from '../options';

export default function VerticalAlignment( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Vertical Alignment', 'generateblocks' ) }
			value={ value }
			options={ spacingOptions.verticalAlignment }
			onChange={ onChange }
		/>
	);
}
